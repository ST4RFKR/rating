import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { Typography, Box, Button, LinearProgress } from '@mui/material';
import RatingDetail from '../RatingDetail'; // Используем тот же компонент
import { fetchRatings } from '../../features/rating/ratingSlice';
import EmployeInfo from '../EmployeeInfo';

import RatingFilter from '../RatingFilter';
import { useRating } from '../../hook/useRating';
import RatingDetailSkeleton from '../RatingDetailSkeleton';
import EmployeInfoSkeleton from '../EmployeInfoSkeleton';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { useAppSelector } from '../../hook/useAppSelector';
import { employeesSelector } from '../../features/employees/employeesSelector';
import { ratingSelector } from '../../features/rating/ratingSelector';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';

const EmployeePage = ({ path }: any) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  const { data: employees, isLoading: isLoadingEmployees } = useGetEmployeesQuery();
  const statusRatingData = useAppSelector((state: RootState) => state.ratings.status);
  const statusEmployeeData = useAppSelector((state: RootState) => state.employees.status);
  const ratings = useAppSelector(ratingSelector);

  const employee = employees?.find((el) => el.id === id);
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
        {statusEmployeeData === 'pending' ? (
          <EmployeInfoSkeleton />
        ) : (
          <EmployeInfo employee={employee} />
        )}
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
