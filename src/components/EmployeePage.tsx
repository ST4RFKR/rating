import React from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Typography, Paper, Box, Grid, Divider } from '@mui/material';

const EmployeePage = () => {
  const stores = useSelector((state: RootState) => state.stores);
  const employees = useSelector((state: RootState) => state.employees);
  const ratings = useSelector((state: RootState) => state.ratings);
  const { id } = useParams<{ id: string }>();

  const employee = employees.find((emp) => emp.id === id);
  const store = stores.find((store) => store.id === employee?.currentStoreId);
  const currentRatings = ratings.filter((r) => r.employeeId === employee?.id);

  return employee ? (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          {employee.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Работает по умолчанию: {store?.name || 'Не указано'}
        </Typography>
        <Typography variant="body1">Должность: {employee.position}</Typography>
        <Typography variant="body1">Контакты: {employee.phone}</Typography>
        <Typography variant="body1">Работает с: {employee.hireDate}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Оценки
        </Typography>
        {currentRatings.length ? (
          currentRatings.map((r) => (
            <Box key={`${r.date}-${r.time}`} sx={{ marginBottom: 2 }}>
              <Divider sx={{ marginY: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Дата: {r.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Время: {r.time}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>Оценка: {r.score}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>Магазин: {store?.name || 'Не указано'}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>
                    Видео:{' '}
                    <a href={r.videoUrl} target="_blank" rel="noopener noreferrer">
                      {r.videoUrl}
                    </a>
                  </Typography>
                </Grid>
                {r.comment && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                      Комментарий: {r.comment}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography color="textSecondary">Нет оценок для отображения</Typography>
        )}
      </Paper>
    </Box>
  ) : (
    <Typography variant="h6" sx={{ padding: 3 }}>
      Сотрудник не найден
    </Typography>
  );
};

export default EmployeePage;
