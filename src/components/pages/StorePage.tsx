import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Typography, Box, Paper, ButtonGroup, Button, IconButton } from '@mui/material';
import RatingDetail from '../RatingDetail';
import Modal from '../Modal';
import AddNewRatingForm from '../form/AddNewRatingForm';

import RatingDetailSkeleton from '../RatingDetailSkeleton';
import TitleSkeleton from '../TitleSkeleton';
import SortBy from '../UI/select/SortBy';

import { useAppDispatch } from '../../hook/useAppDispatch';

import { showNotification } from '../../appSlice';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useGetSingleStoreQuery, useUpdateStoreMutation } from '../../features/stores/storesApi';
import { useGetRatingsQuery } from '../../features/rating/ratingApi';

const StorePage = ({ getPath }: any) => {
  const { id } = useParams<{ id: string }>();
  const { data: store } = useGetSingleStoreQuery(id);
  const { data: employees, isLoading: isLoadingEmployees } = useGetEmployeesQuery();
  const { data: ratings, isLoading: isLoadingRatings } = useGetRatingsQuery();
  const [updateStore] = useUpdateStoreMutation();

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    getPath(pathname);
  }, [pathname]);

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  });

  const filteredEmployees = employees?.filter((el) => store?.employees.includes(el.id));
  const sortRatings = (ratings: any) => {
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
        Магазин не знайдено... 🥲
      </Typography>
    );
  }
  const removeEmployee = (payload: { storeId: string; employeeId: string }) => {
    const { storeId, employeeId } = payload;
    const ratingsLength = ratings?.filter(
      (el) => el.employeeId === employeeId && el.store.id === storeId,
    ).length;

    // Обновляем массив сотрудников, удаляя нужного сотрудника
    const updatedStore = {
      ...store,
      employees: store.employees.filter((employee: any) => employee !== employeeId),
    };

    // Вызываем санку для обновления
    if (ratingsLength !== 0) {
      console.log(ratingsLength);
      dispatch(
        showNotification({
          message: `Дані не видалено: у працівника є оцінки. ☺️`,
          severity: 'error',
        }),
      );
      return;
    }
    updateStore({ id: storeId, updatedData: updatedStore }).then(() => {
      dispatch(
        showNotification({
          message: `Дані успішно видалено!`,
          severity: 'success',
        }),
      );
    });
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Сотрудники магазина {store.name}
      </Typography>

      <ButtonGroup sx={{ m: '10px' }} variant="outlined">
        <Button onClick={handleOpen}>Оцінити працівника</Button>
        <Link to={'/main'}>
          <Button>Назад до вибору магазину</Button>
        </Link>
      </ButtonGroup>

      <Modal
        storeID={id}
        open={open}
        handleClose={handleClose}
        decription={'Створити оцінку працівнику'}>
        <AddNewRatingForm store={store} handleClose={handleClose} />
      </Modal>

      {filteredEmployees?.map((el) => {
        const filteredRating = ratings?.filter((r) => r.employeeId === el.id && r.store.id === id);
        const sortedRatings = sortRatings(filteredRating || []);

        return (
          <Paper key={el.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {isLoadingEmployees && <TitleSkeleton />}
              <Typography
                sx={{
                  cursor: 'pointer',
                  transition: 'color 0.3s, text-decoration 0.3s, transform 0.3s',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.05)',
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
            {isLoadingRatings && [...Array(4)].map((_, idx) => <RatingDetailSkeleton key={idx} />)}

            {sortedRatings.length ? (
              sortedRatings.map((rating: any) => (
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
                Оцінок немає. 😉
              </Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default StorePage;
