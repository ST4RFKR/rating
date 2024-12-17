import React from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { v1 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { useUpdateStoreMutation } from '../../features/stores/storesApi';
import { useAddRatingMutation } from '../../features/rating/ratingApi';

const AddNewRatingForm = ({ store, handleClose }: any) => {
  const { data: employees } = useGetEmployeesQuery();
  const [updateStore] = useUpdateStoreMutation();
  const [addRating] = useAddRatingMutation();

  const currentStoreEmployees = employees?.filter((emp) => emp.currentStoreId === store.id) || [];
  const otherEmployees = employees?.filter((emp) => emp.currentStoreId !== store.id) || [];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      date: '',
      time: '',
      score: 0,
      comment: '',
      videoUrl: '',
      employee: null,
    },
  });

  const onSubmit = async (data: any) => {
    const employeeId = data.employee?.id;
    const newRating = {
      id: v1(),
      date: data.date,
      time: data.time,
      score: data.score,
      comment: data.comment,
      videoUrl: data.videoUrl,
      employeeId,
    };

    if (!store.employees.includes(employeeId)) {
      const updatedStore = {
        ...store,
        employees: [...store.employees, employeeId],
      };
      await updateStore({ id: updatedStore.id, updatedData: updatedStore });
    }

    await addRating({ ...newRating, store: { id: store.id, name: store.name } });
    reset();
    handleClose(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      {/* Поле автокомпліт для вибору співробітника */}
      <Controller
        name="employee"
        control={control}
        rules={{ required: 'Виберіть співробітника' }}
        render={({ field }) => (
          <Autocomplete
            options={[...currentStoreEmployees, ...otherEmployees]}
            getOptionLabel={(option) => option.name || ''}
            onChange={(e, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Виберіть співробітника"
                placeholder="Введіть ім'я співробітника"
                error={!!errors.employee}
                helperText={errors.employee?.message}
              />
            )}
          />
        )}
      />

      {/* Поле дати */}
      <Controller
        name="date"
        control={control}
        rules={{ required: 'Дата є обовзяковою' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Дата"
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        )}
      />

      {/* Поле часу */}
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="time" label="Час" InputLabelProps={{ shrink: true }} />
        )}
      />

      {/* Поле оцінки */}
      <Controller
        name="score"
        control={control}
        rules={{
          required: 'Оцінка є обовзяковою',
          min: { value: 0, message: 'Оцінка має бути від 0 до 2' },
          max: { value: 2, message: 'Оцінка має бути від 0 до 2' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Оцінка (0-2)"
            InputProps={{ inputProps: { min: 0, max: 2 } }}
            error={!!errors.score}
            helperText={errors.score?.message}
          />
        )}
      />

      {/* Поле коментаря */}
      <Controller
        name="comment"
        control={control}
        render={({ field }) => <TextField {...field} label="Коментар" multiline rows={2} />}
      />

      {/* Поле відеопосилання */}
      <Controller
        name="videoUrl"
        control={control}
        render={({ field }) => <TextField {...field} label="Посилання на відео" />}
      />

      {/* Кнопки */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="secondary" onClick={() => handleClose(false)}>
          Скасувати
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Додати оцінку
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewRatingForm;
