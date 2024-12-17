import { Link, useNavigate, useParams } from 'react-router-dom';

import { Typography, Box, Button } from '@mui/material';
import RatingDetail from '../RatingDetail';

import EmployeInfo from '../EmployeeInfo';

import RatingFilter from '../RatingFilter';
import { useRating } from '../../hook/useRating';
import RatingDetailSkeleton from '../RatingDetailSkeleton';
import EmployeInfoSkeleton from '../EmployeInfoSkeleton';

import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { useGetRatingsQuery } from '../../features/rating/ratingApi';
import { useState } from 'react';

const EmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { data: employees, isLoading: isLoadingEmployees } = useGetEmployeesQuery();
  const { data: ratings, isLoading: isLoadingRetings } = useGetRatingsQuery();

  const employee = employees?.find((el) => el.id === id);
  const employeeRatings = ratings?.filter((rating) => rating.employeeId === id);

  const [filter, setFilter] = useState({ sort: '', query: '', currentMonth: false });
  const sortedAndSearchRatings = useRating(
    employeeRatings || [],
    filter.sort,
    filter.query,
    filter.currentMonth,
  );
  if (!employee) {
    return <Typography variant="h6">Співробітник не знайдений</Typography>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <Button onClick={handleBack} variant="outlined" sx={{ m: '10px' }}>
          Назад в магазин
        </Button>
        <RatingFilter filter={filter} setFilter={setFilter} />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        {isLoadingEmployees ? <EmployeInfoSkeleton /> : <EmployeInfo employee={employee} />}
      </Box>
      {isLoadingRetings && [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}
      {/* Список оцінок співробітника */}
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
          Немає оцінок
        </Typography>
      )}
    </Box>
  );
};

export default EmployeePage;
