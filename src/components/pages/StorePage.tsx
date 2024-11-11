import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Typography, Box, Paper, ButtonGroup, Button } from '@mui/material';
import RatingDetail from '../RatingDetail';
import Modal from '../Modal';
import AddNewRatingForm from '../form/AddNewRatingForm';
import { fetchStores, storesType } from '../../features/stores/storesSlice';
import { fetchEmployee } from '../../features/employees/employeesSlice';
import { fetchRatings } from '../../features/rating/ratingSlice';
import RatingDetailSkeleton from '../RatingDetailSkeleton';
import TitleSkeleton from '../TitleSkeleton';

const StorePage = ({ getPath }: any) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    getPath(pathname);
  }, [pathname]);

  const stores = useSelector((state: RootState) => state.stores.stores);
  const { status: statusEmployeesData, employee: employees } = useSelector(
    (state: RootState) => state.employees,
  );
  const { status: statusRatingData, ratings } = useSelector((state: RootState) => state.ratings);

  const dispatch = useDispatch<AppDispatch>();

  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  });

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchRatings());
    dispatch(fetchStores());
  }, [dispatch]);

  const store = stores.find((s: storesType) => s.id === id);
  const filteredEmployees = employees.filter((el) => store?.employees.includes(el.id));

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

      <ButtonGroup sx={{ m: '10px' }} variant="outlined">
        <Button onClick={handleOpen}>Оценить сотрудника</Button>
        <Link to={'/main'}>
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

      {filteredEmployees.map((el) => {
        const filteredRating = ratings.filter((r) => r.employeeId === el.id && r.store.id === id);

        return (
          <Paper key={el.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <Link to={`/employee/${el.id}`} style={{ textDecoration: 'none' }}>
              {statusEmployeesData === 'pending' && <TitleSkeleton />}
              <Typography variant="h6">{el.name}</Typography>
            </Link>
            {statusRatingData === 'pending' &&
              [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}

            {filteredRating.length ? (
              filteredRating.map((rating) => (
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
          </Paper>
        );
      })}
    </Box>
  );
};

export default StorePage;
