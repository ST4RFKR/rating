import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Typography, Box, ButtonGroup, Button } from '@mui/material';
import { useGetSingleStoreQuery, useUpdateStoreMutation } from '../api/storesApi';
import { useGetEmployeesQuery } from '../../employees/api/employeesApi';
import { useGetRatingsQuery } from '../../rating/api/ratingApi';
import { useAppDispatch } from '../../../components/common/hook/useAppDispatch';
import { showNotification } from '../../../appSlice';
import Modal from '../../../components/common/Modal';
import AddNewRatingForm from '../../../components/form/AddNewRatingForm';
import EmployeeRatings from '../../employees/ui/EmployeePage/EmployeeRatings/EmployeeRatings';
import { SortOption } from '../../../components/common/ui/select/SortBy';
import { useAbility } from '../../../components/casl/useAbility';
import { Can } from '@casl/react';

const StorePage = ({ getPath }: { getPath: (path: string) => void }) => {
  const { id } = useParams<{ id: string }>();
  const { data: store } = useGetSingleStoreQuery(id);
  const { data: employees, isLoading: isLoadingEmployees } = useGetEmployeesQuery();
  const { data: ratings, isLoading: isLoadingRatings } = useGetRatingsQuery();
  const [updateStore] = useUpdateStoreMutation();
  const ability = useAbility();

  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<{ sort: SortOption; query: string }>({
    sort: 'date-asc',
    query: '',
  });

  useEffect(() => {
    getPath(pathname);
  }, [pathname, getPath]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!store) {
    return (
      <Typography variant="h6" color="error" align="center">
        Магазин не знайдено... 🥲
      </Typography>
    );
  }

  const filteredEmployees = employees?.filter((el) => store?.employees.includes(el.id));

  const removeEmployee = ({ storeId, employeeId }: { storeId: string; employeeId: string }) => {
    const ratingsLength = ratings?.filter(
      (el) => el.employeeId === employeeId && el.store.id === storeId,
    ).length;

    if (ratingsLength !== 0) {
      dispatch(
        showNotification({
          message: `Дані не видалено: у працівника є оцінки. ☺️`,
          severity: 'error',
        }),
      );
      return;
    }

    const updatedStore = {
      ...store,
      employees: store.employees.filter((employee: string) => employee !== employeeId),
    };

    updateStore({ id: storeId, updatedData: updatedStore }).then(() => {
      dispatch(
        showNotification({
          message: `Дані успішно видалено!`,
          severity: 'success',
        }),
      );
    });
  };

  const sortRatings = (ratings: any[]) => {
    if (!filter.sort) return ratings;

    return [...ratings].sort((a, b) => {
      if (filter.sort === 'date-asc') return a.date.localeCompare(b.date);
      if (filter.sort === 'date-desc') return b.date.localeCompare(a.date);
      if (filter.sort === 'time-asc') return a.time.localeCompare(b.time);
      if (filter.sort === 'time-desc') return b.time.localeCompare(a.time);
      return 0;
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Співробітники магазину {store.name}
      </Typography>

      <Can I="create" a="Article" ability={ability}>
        <Button variant="outlined" onClick={handleOpen}>
          Оцінити працівника
        </Button>
      </Can>

      <Button variant="outlined" sx={{ m: '10px' }} component={Link} to="/main">
        Назад до вибору магазину
      </Button>

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
          <EmployeeRatings
            key={el.id}
            el={el}
            store={{ id: store.id }}
            isLoadingEmployees={isLoadingEmployees}
            isLoadingRatings={isLoadingRatings}
            removeEmployee={removeEmployee}
            filter={filter}
            setFilter={setFilter}
            sortedRatings={sortedRatings}
          />
        );
      })}
    </Box>
  );
};

export default StorePage;
