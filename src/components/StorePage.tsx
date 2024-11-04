import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchStores, storesType } from '../features/stores/storesSlice';
import { employeeType, fetchEmployee } from '../features/employees/employeesSlice';
import { Typography, Box, Paper, List, Button } from '@mui/material';
import { RatingItem } from './RatingItem';
import Modal from './Modal';
import AddNewRatingForm from './AddNewRatingForm';
import { fetchRatings } from '../features/rating/ratingSlice';

const StorePage = () => {
  const { id } = useParams<{ id: string }>();

  const stores = useSelector((state: RootState) => state.stores.stores);
  const employees = useSelector((state: RootState) => state.employees.employee);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
    dispatch(fetchStores());
  }, [dispatch]);

  const ratings = useSelector((state: RootState) => state.ratings.ratings);

  const store = stores.find((s: storesType) => s.id == id);
  const filteredEmployees = employees.filter((el) => {
    return store?.employees.includes(el.id);
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Button onClick={handleOpen} variant="outlined">
        Оценить сотрудника
      </Button>
      <Modal
        storeID={id}
        open={open}
        handleClose={handleClose}
        decription={'Создать оценку для сотрудника'}>
        <AddNewRatingForm store={store} handleClose={handleClose} />
      </Modal>
      {filteredEmployees.map((el: employeeType) => {
        const filteredRating = ratings.filter((r) => r.employeeId === el.id && r.storeId === id);

        return (
          <Paper key={el.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <Link to={`/employee/${el.id}`} key={el.id} style={{ textDecoration: 'none' }}>
              <Typography variant="h6">{el.name}</Typography>
            </Link>
            {filteredRating.length ? (
              <List>
                {filteredRating.map((rating) => (
                  <RatingItem {...rating} />
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
