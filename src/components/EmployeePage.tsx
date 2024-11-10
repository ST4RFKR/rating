import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Typography, Box, Button } from '@mui/material';
import RatingDetail from './RatingDetail'; // Используем тот же компонент
import { fetchEmployee } from '../features/employees/employeesSlice';
import { fetchRatings } from '../features/rating/ratingSlice';
import EmployeInfo from './EmployeeInfo';
import SortBy from './UI/select/SortBy';
import SearchInput from './UI/input/SearchInput';
import { query } from 'firebase/firestore';
import RatingFilter from './RatingFilter';


const EmployeePage = ({ path }: any) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
  }, [dispatch]);

  const employees = useSelector((state: RootState) => state.employees.employee);
  const ratings = useSelector((state: RootState) => state.ratings.ratings);

  const employee = employees.find((el) => el.id === id);
  const employeeRatings = ratings.filter((rating) => rating.employeeId === id);

  const [filter, setFilter] = React.useState({ sort: '', query: '', currentMonth: false });

  const sortedRatings = React.useMemo(() => {
    // Сортировка
    let sorted = [...employeeRatings];
    if (filter.sort === 'date-asc') {
      sorted = sorted.sort((a, b) => a.date.localeCompare(b.date));
    } else if (filter.sort === 'date-desc') {
      sorted = sorted.sort((a, b) => b.date.localeCompare(a.date));
    } else if (filter.sort === 'store-asc') {
      sorted = sorted.sort((a, b) => a.store.id.localeCompare(b.store.id));
    } else if (filter.sort === 'store-desc') {
      sorted = sorted.sort((a, b) => b.store.id.localeCompare(a.store.id));
    }
    return sorted;
  }, [employeeRatings, filter.sort]);
  const sortedAndSearchRatings = React.useMemo(() => {
    let filteredRatings = sortedRatings;

    // Фильтрация по текущему месяцу
    if (filter.currentMonth) {
      filteredRatings = filteredRatings.filter((rating) => {
        const [year, month] = rating.date.split('-').map(Number);
        return month === currentMonth && year === currentYear;
      });
    }

    // Фильтрация по запросу
    if (filter.query) {
      filteredRatings = filteredRatings.filter((rating) =>
        rating.store.name.toLowerCase().includes(filter.query.toLowerCase()),
      );
    }

    return filteredRatings;
  }, [filter.query, filter.currentMonth, sortedRatings]);

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
        <EmployeInfo employee={employee} />
      </Box>

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
