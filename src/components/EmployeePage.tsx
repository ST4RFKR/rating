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

type SortOption = 'date-asc' | 'date-desc' | 'store-asc' | 'store-desc';
const EmployeePage = ({ path }: any) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
  }, [dispatch]);

  const employees = useSelector((state: RootState) => state.employees.employee);
  const ratings = useSelector((state: RootState) => state.ratings.ratings);
  const stores = useSelector((state: RootState) => state.stores.stores);

  const employee = employees.find((el) => el.id === id);
  const employeeRatings = ratings.filter((rating) => rating.employeeId === id);
  const currentStore = stores.find((store) => store.id === employee?.currentStoreId);

  const [selectedSort, setSelectedSort] = React.useState('');
  const sortedRatings = React.useMemo(() => {
    let sorted = [...employeeRatings];
    if (selectedSort === 'date-asc') {
      sorted = sorted.sort((a, b) => a.date.localeCompare(b.date));
    } else if (selectedSort === 'date-desc') {
      sorted = sorted.sort((a, b) => b.date.localeCompare(a.date));
    } else if (selectedSort === 'store-asc') {
      sorted = sorted.sort((a, b) => a.storeId.localeCompare(b.storeId));
    } else if (selectedSort === 'store-desc') {
      sorted = sorted.sort((a, b) => b.storeId.localeCompare(a.storeId));
    }
    return sorted;
  }, [employeeRatings, selectedSort]);

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
        <SortBy
          value={selectedSort}
          onChange={(value: SortOption) => setSelectedSort(value)}
          defaultValue="Сортировка"
          options={[
            { value: 'store-asc', name: 'По магазинам (по возрастанию)' },
            { value: 'store-desc', name: 'По магазинам (по убыванию)' },
            { value: 'date-asc', name: 'По дате (по возрастанию)' },
            { value: 'date-desc', name: 'По дате  (по убыванию)' },
          ]}
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <EmployeInfo employee={employee} />
      </Box>

      {/* Список оценок сотрудника */}
      {sortedRatings.length ? (
        sortedRatings.map((rating) => (
          <RatingDetail
            key={rating.id}
            date={rating.date}
            time={rating.time}
            score={rating.score}
            storeId={rating.storeId}
            videoUrl={rating.videoUrl}
            comment={rating.comment}
            stores={stores} // передаем магазины, если нужно
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
