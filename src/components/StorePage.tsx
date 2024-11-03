import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { storesType } from '../features/stores/storesSlice';
import { employeeType } from '../features/employees/employeesSlice';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const stores = useSelector((state: RootState) => state.stores);
  const employees = useSelector((state: RootState) => state.employees);
  const ratings = useSelector((state: RootState) => state.ratings);
  const store = stores.find((s: storesType) => s.id === id);
  const filteredEmployees = employees.filter((el) => store?.employees.includes(el.id));

  if (!store) {
    return (
      <Typography variant="h6" color="error" align="center">
        Магазин не найден.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Сотрудники магазина {store.name}
      </Typography>
      {filteredEmployees.map((el: employeeType) => {
        const filteredRating = ratings.filter((r) => r.employeeId === el.id);

        return (
          <Paper key={el.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <Link to={`/employee/${el.id}`} key={el.id} style={{ textDecoration: 'none' }}>
              <Typography variant="h6">{el.name}</Typography>
            </Link>
            {filteredRating.length ? (
              <List>
                {filteredRating.map((rating) => (
                  <ListItem key={rating.id}>
                    <ListItemText
                      primary={
                        <>
                          <strong>Дата:</strong> {rating.date} <br />
                          <strong>Время:</strong> {rating.time} <br />
                          <strong>Оценка:</strong> {rating.score} <br />
                          <strong>Комментарий:</strong> {rating.comment} <br />
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Нет оценок
              </Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default StorePage;
