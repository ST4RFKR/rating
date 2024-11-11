import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { createStore, storesType } from '../../features/stores/storesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { employeeType, fetchEmployee } from '../../features/employees/employeesSlice';
import { AppDispatch, RootState } from '../../redux/store';
type AddStoreForm = {
  handleClose: (value: boolean) => void;
};
const AddStoreForm = ({ handleClose }: AddStoreForm) => {
  const employees = useSelector((state: RootState) => state.employees.employee);
  const dispatch = useDispatch<AppDispatch>();
  const [storeData, setStoreData] = useState({
    id: '',
    name: '',
    location: '',
    employees: [],
  });
  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  const changeStoreData = (params: string) => {
    return (e: any) => {
      setStoreData({
        ...storeData,
        [params]: e.target.value,
      });
    };
  };
  const handleEmployeesChange = (e: any, selectedEmployees: any) => {
    setStoreData({
      ...storeData,
      employees: selectedEmployees.map((emp: any) => emp.id), // Сохраняем только ID сотрудников
    });
  };
  const AddNewStore = () => {
    dispatch(createStore({ ...storeData }));
    handleClose(false);
  };
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        label="ID магазина"
        value={storeData.id} // Заглушка для ID
        onChange={changeStoreData('id')} // Заглушка для обработчика
        fullWidth
      />
      <TextField
        label="Название магазина"
        value={storeData.name} // Заглушка для названия
        onChange={changeStoreData('name')} // Заглушка для обработчика
        fullWidth
      />
      <TextField
        label="Расположение магазина"
        value={storeData.location} // Заглушка для локации
        onChange={changeStoreData('location')} // Заглушка для обработчика
        fullWidth
      />
      <Autocomplete
        multiple
        options={employees}
        getOptionLabel={(option) => option.name}
        onChange={handleEmployeesChange}
        renderInput={(params) => (
          <TextField {...params} label="Сотрудники" placeholder="Выберите сотрудников" />
        )}
        ListboxProps={{
          style: {
            maxHeight: 200,
            overflow: 'auto',
          },
        }}
      />
      <Button variant="contained" color="primary" onClick={AddNewStore}>
        {' '}
        {/* Заглушка для onClick */}
        Добавить магазин
      </Button>
    </Box>
  );
};

export default AddStoreForm;