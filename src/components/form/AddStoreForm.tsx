import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { useAppDispatch } from '../../hook/useAppDispatch';

import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { useAddStoreMutation } from '../../features/stores/storesApi';

type AddStoreForm = {
  handleClose: (value: boolean) => void;
};
const AddStoreForm = ({ handleClose }: AddStoreForm) => {
  const { data: employees } = useGetEmployeesQuery();
  const dispatch = useAppDispatch();
  const [addStore] = useAddStoreMutation();
  const [storeData, setStoreData] = useState({
    id: '',
    name: '',
    location: '',
    employees: [],
  });

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
    addStore(storeData);
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
        options={employees ? employees : []}
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
