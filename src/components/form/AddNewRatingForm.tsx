import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { createRating } from '../../features/rating/ratingSlice';
import { v1 } from 'uuid';
import { fetchEmployee } from '../../features/employees/employeesSlice';
import { updateStoreEmployees } from '../../features/stores/storesSlice';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { useAppSelector } from '../../hook/useAppSelector';
import { employeesSelector } from '../../features/employees/employeesSelector';

const AddNewRatingForm = ({ store, handleClose }: any) => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(employeesSelector);
  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  const [ratingData, setRatingData] = useState({
    id: v1(),
    date: '',
    time: '',
    score: 0,
    comment: '',
    videoUrl: '',
    employeeId: '',
  });

  const currentStoreEmployees = employees.filter((emp) => emp.currentStoreId === store.id);
  const currentEmpData = employees.filter((emp) => emp.id === ratingData.employeeId);

  const otherEmployees = employees.filter((emp) => emp.currentStoreId !== store.id);

  console.log(currentEmpData);

  const changeStoreData = (params: string) => {
    return (e: any) => {
      const value = params === 'rating' ? +e.target.value : e.target.value;

      setRatingData({
        ...ratingData,
        [params]: value,
      });
    };
  };

  const newRating = async () => {
    if (!store.employees.includes(ratingData.employeeId)) {
      const updatedStore = {
        ...store,
        employees: [...store.employees, ratingData.employeeId],
      };
      await dispatch(updateStoreEmployees(updatedStore));
    }
    dispatch(createRating({ ...ratingData, store: { id: store.id, name: store.name } }));
    setRatingData({
      id: v1(),
      date: '',
      time: '',
      score: 0,
      comment: '',
      videoUrl: '',
      employeeId: '',
    });

    handleClose(false);
  };
  const handleEmployeesChange = (e: any, selectedEmployees: any) => {
    if (selectedEmployees) {
      setRatingData({
        ...ratingData,
        employeeId: selectedEmployees.id,
      });
    } else {
      console.log('No employee selected');
      setRatingData({
        ...ratingData,
        employeeId: '',
      });
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <Autocomplete
        options={[...currentStoreEmployees, ...otherEmployees]}
        filterOptions={() => {
          return [...currentStoreEmployees, ...otherEmployees];
        }}
        getOptionLabel={(option) => option.name}
        onChange={handleEmployeesChange}
        renderInput={(params) => (
          <TextField {...params} label="Выберите сотрудникa" placeholder="Выберите сотрудникa" />
        )}
        ListboxProps={{
          style: {
            maxHeight: 200, // Ограничение высоты выпадающего списка (около 5 элементов)
            overflow: 'auto',
          },
        }}
      />
      <TextField type="date" value={ratingData.date} onChange={changeStoreData('date')} fullWidth />
      <TextField type="time" value={ratingData.time} onChange={changeStoreData('time')} fullWidth />
      <TextField
        type="number"
        label="Оценка"
        InputProps={{ inputProps: { min: 0, max: 2 } }}
        onInput={(e: any) => {
          const value = e.target.value;
          if (value > 2) return (e.target.value = 2);
          if (value < 0) return (e.target.value = 0);
        }}
        value={ratingData.score}
        onChange={changeStoreData('score')}
        fullWidth
      />
      <TextField label="Коментарий" onChange={changeStoreData('comment')} fullWidth />
      <TextField label="Ссылка на видео" onChange={changeStoreData('videoUrl')} fullWidth />

      <Button variant="contained" color="primary" onClick={newRating}>
        {' '}
        {/* Заглушка для onClick */}
        Добавить оценку
      </Button>
    </Box>
  );
};

export default AddNewRatingForm;
