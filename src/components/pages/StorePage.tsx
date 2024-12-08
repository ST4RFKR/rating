import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import {
  Typography,
  Box,
  Paper,
  ButtonGroup,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import RatingDetail from '../RatingDetail';
import Modal from '../Modal';
import AddNewRatingForm from '../form/AddNewRatingForm';
import { fetchStores, storesType, updateStoreEmployees } from '../../features/stores/storesSlice';
import { fetchRatings, ratingType } from '../../features/rating/ratingSlice';
import RatingDetailSkeleton from '../RatingDetailSkeleton';
import TitleSkeleton from '../TitleSkeleton';
import SortBy from '../UI/select/SortBy';

import { useAppSelector } from '../../hook/useAppSelector';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { employeesSelector } from '../../features/employees/employeesSelector';
import { ratingSelector } from '../../features/rating/ratingSelector';
import { hideNotification, notificationSelector, showNotification } from '../../appSlice';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { arrayRemove, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Delete as DeleteIcon } from '@mui/icons-material';

const StorePage = ({ getPath }: any) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    getPath(pathname);
  }, [pathname]);
  // Ваш компонент или обработчик

  const stores = useAppSelector((state: RootState) => state.stores.stores);
  const { data: employees } = useGetEmployeesQuery();
  const ratings = useAppSelector(ratingSelector);

  const statusEmployeesData = useAppSelector((state) => state.employees.status);
  const statusRatingData = useAppSelector((state) => state.ratings.status);

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  });

  useEffect(() => {
    dispatch(fetchRatings());
    dispatch(fetchStores());
  }, [dispatch]);

  const store = stores.find((s: storesType) => s.id === id);
  const filteredEmployees = employees?.filter((el) => store?.employees.includes(el.id));
  const sortRatings = (ratings: ratingType[]) => {
    if (!filter.sort) return ratings;

    return [...ratings].sort((a, b) => {
      if (filter.sort === 'date-asc') return a.date.localeCompare(b.date);
      if (filter.sort === 'date-asc') return b.date.localeCompare(a.date);
      if (filter.sort === 'time-asc') return a.time.localeCompare(b.time);
      if (filter.sort === 'time-desc') return b.time.localeCompare(a.time);

      return 0;
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!store) {
    return (
      <Typography variant="h6" color="error" align="center">
        Магазин не найден.
      </Typography>
    );
  }
  const removeEmployee = (payload: { storeId: string; employeeId: string }) => {
    const { storeId, employeeId } = payload;
    const currentStore = stores.find((el) => el.id === storeId);
    const ratingsLength = ratings.filter((el) => el.employeeId === employeeId).length;
    // Проверяем, что магазин найден
    if (!currentStore) {
      console.error('Store not found!');
      return;
    }

    // Обновляем массив сотрудников, удаляя нужного сотрудника
    const updatedStore = {
      ...currentStore,
      employees: currentStore.employees.filter((employee) => employee !== employeeId),
    };

    // Вызываем санку для обновления
    if (ratingsLength !== 0) {
      dispatch(
        showNotification({
          message: `Дані не видалено: у працівника є оцінки.`,
          severity: 'error',
        }),
      );
      return;
    }
    dispatch(updateStoreEmployees(updatedStore));
    dispatch(
      showNotification({
        message: `Дані успішно видалено!`,
        severity: 'success',
      }),
    );
  };
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

      {filteredEmployees?.map((el) => {
        const filteredRating = ratings.filter((r) => r.employeeId === el.id && r.store.id === id);
        const sortedRatings = sortRatings(filteredRating);

        return (
          <Paper key={el.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {statusEmployeesData === 'pending' && <TitleSkeleton />}
              <Typography
                sx={{
                  cursor: 'pointer', // Указывает, что элемент кликабельный
                  transition: 'color 0.3s, text-decoration 0.3s, transform 0.3s', // Добавляем анимацию увеличения
                  '&:hover': {
                    color: 'primary.main', // Меняем цвет текста при наведении
                    transform: 'scale(1.05)', // Увеличиваем текст на 5%
                  },
                }}
                variant="h6">
                <Link to={`/employees/${el.id}`} style={{ textDecoration: 'none' }}>
                  {el.name}{' '}
                </Link>

                <IconButton
                  onClick={() => {
                    removeEmployee({ storeId: store.id, employeeId: el.id });
                  }}>
                  <DeleteIcon sx={{ opacity: 0.9, fill: 'gray' }} />
                </IconButton>
              </Typography>

              <SortBy
                value={filter}
                onChange={setFilter}
                defaultValue="Сортировка"
                options={[
                  { value: 'date-asc', name: 'По времени (по возрастанию)' },
                  { value: 'date-desc', name: 'По времени  (по убыванию)' },
                  { value: 'time-asc', name: 'По дате (по возрастанию)' },
                  { value: 'time-desc', name: 'По дате  (по убыванию)' },
                ]}
              />
            </Box>
            {statusRatingData === 'pending' &&
              [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}

            {sortedRatings.length ? (
              sortedRatings.map((rating) => (
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
