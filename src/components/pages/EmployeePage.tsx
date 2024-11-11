import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Typography, Box, Button } from '@mui/material';
import RatingDetail from '../RatingDetail'; // Используем тот же компонент
import { fetchEmployee } from '../../features/employees/employeesSlice';
import { fetchRatings } from '../../features/rating/ratingSlice';
import EmployeInfo from '../EmployeeInfo';

import RatingFilter from '../RatingFilter';
import { useRating } from '../../hook/useRating';
import RatingDetailSkeleton from '../RatingDetailSkeleton';
import EmployeInfoSkeleton from '../EmployeInfoSkeleton';

const EmployeePage = ({ path }: any) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
  }, [dispatch]);

  const { status: statusEmployeeDAta, employee: employees } = useSelector(
    (state: RootState) => state.employees,
  );
  const { status: statusRatingData, ratings } = useSelector((state: RootState) => state.ratings);

  const employee = employees.find((el) => el.id === id);
  const employeeRatings = ratings.filter((rating) => rating.employeeId === id);

  const [filter, setFilter] = React.useState({ sort: '', query: '', currentMonth: false });
  const sortedAndSearchRatings = useRating(
    employeeRatings,
    filter.sort,
    filter.query,
    filter.currentMonth,
  );
  if (!employee) {
    return <Typography variant="h6">Сотрудник не найден</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Кнопка для возврата в магазин */}
      <Box>
        <Link to={path}>
          <Button variant="outlined" sx={{ m: '10px' }}>
            Назад в магазин
          </Button>
        </Link>
        <RatingFilter filter={filter} setFilter={setFilter} />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        {statusEmployeeDAta === 'pending' ? (
          <EmployeInfoSkeleton />
        ) : (
          <EmployeInfo employee={employee} />
        )}
        <EmployeInfoSkeleton />
      </Box>
      {statusRatingData === 'pending' &&
        [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}
      {/* Список оценок сотрудника */}
      {sortedAndSearchRatings.length ? (
        sortedAndSearchRatings.map((rating) => (
          <RatingDetail
            key={rating.id}
            date={rating.date}
            time={rating.time}
            score={rating.score}
            store={rating.store}
            videoUrl={rating.videoUrl}
            comment={rating.comment}
            ratingId={rating.id}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет оценок
        </Typography>
      )}
    </Box>
  );
};

export default EmployeePage;
