import React, { useState } from 'react';
import { TextField, Button, Box, Grid, LinearProgress } from '@mui/material';
import { useAppDispatch } from '../common/hook/useAppDispatch';
import { useAddEmployeesMutation } from '../../features/employees/api/employeesApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { showNotification } from '../../appSlice';

type AddEmployeeFormProps = {
  handleClose: (value: boolean) => void;
};

const AddEmployeeForm = ({ handleClose }: AddEmployeeFormProps) => {
  const [addNewEmployes, { isLoading: isLoadingAddNewEmployee }] = useAddEmployeesMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      id: '',
      name: '',
      currentStoreId: '',
      address: '',
      averageScore: '',
      email: '',
      hireDate: '',
      phone: '',
      position: '',
      performanceScores: [],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const modifiedData = { ...data, id: data.id.toLowerCase() };
      await addNewEmployes(modifiedData)
        .unwrap()
        .then(() => {
          dispatch(showNotification({ message: 'Дані успішно створено! 😀', severity: 'success' }));
        });
      handleClose(false);
    } finally {
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField {...register('id')} label="ID сотрудника" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('name')} label="Имя сотрудника" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('address')} label="Адрес сотрудника" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('email')}
            label="Электронная почта"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('hireDate')}
            type="date"
            label="Дата найма"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('phone')} label="Телефон" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('position')} label="Должность" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField {...register('currentStoreId')} label="ID магазина" fullWidth />
        </Grid>
      </Grid>

      <Button type={'submit'} variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Добавить сотрудника
      </Button>
    </Box>
  );
};

export default AddEmployeeForm;

type Inputs = {
  id: string;
  name: string;
  address: string;
  currentStoreId: string;
  averageScore: string;
  email: string;
  hireDate: string;
  phone: string;
  position: string;
  performanceScores: number[];
};
