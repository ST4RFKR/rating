import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchStores, storesType } from '../features/stores/storesSlice';
import { employeeType, fetchEmployee } from '../features/employees/employeesSlice';
import { Typography, Box, Paper, List, Button, ButtonGroup, IconButton } from '@mui/material';
import { RatingItem } from './RatingItem';
import Modal from './Modal';
import AddNewRatingForm from './AddNewRatingForm';
import { deleteRating, fetchRatings } from '../features/rating/ratingSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const StorePage = ({ getPath }: any) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    getPath(pathname);
  }, [pathname]);

  const stores = useSelector((state: RootState) => state.stores.stores);
  const employees = useSelector((state: RootState) => state.employees.employee);
  const ratings = useSelector((state: RootState) => state.ratings.ratings);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
    dispatch(fetchStores());
  }, [dispatch]);

  const store = stores.find((s: storesType) => s.id == id);
  const filteredEmployees = employees.filter((el) => {
    return store?.employees.includes(el.id);
  });

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

      <ButtonGroup sx={{ m: '10px' }} variant="outlined" aria-label="Basic button group">
        <Button onClick={handleOpen}>Оценить сотрудника</Button>
        <Link to={'/main'}>
          {' '}
          <Button>К выбору магазина</Button>
        </Link>
      </ButtonGroup>
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
          <Paper
            key={el.id}
            elevation={3}
            sx={{ marginBottom: 2, padding: 2, position: 'relative' }}>
            <Link to={`/employee/${el.id}`} key={el.id} style={{ textDecoration: 'none' }}>
              <Typography variant="h6">{el.name}</Typography>
            </Link>

            {filteredRating.length ? (
              <List>
                {filteredRating.map((rating) => (
                  <RatingItem key={rating.id} {...rating} ratingId={rating.id} />
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
