import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/useAppSelector';
import { employeesSelector } from '../../features/employees/employeesSelector';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItemButton,
  Button,
} from '@mui/material';
import { fetchStores, storesSelector } from '../../features/stores/storesSlice';
import { fetchEmployee } from '../../features/employees/employeesSlice';
import { useAppDispatch } from '../../hook/useAppDispatch';

const EmployeesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchStores());
  }, [dispatch]);
  const employees = useAppSelector(employeesSelector);
  const stores = useAppSelector(storesSelector);

  const getStoreName = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId);
    return store ? store.name : 'Позаштатний працівник';
  };

  if (!employees || employees.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary">
        Сотрудники не найдены.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Список працівників
      </Typography>
      <Box>
        <Button variant="contained" color="secondary">
          Створити нового працівника
        </Button>
      </Box>

      <List>
        {employees.map((employee) => (
          <React.Fragment key={employee.id}>
            <ListItem
              component={Link} // Указываем, что используется Link
              to={`/employees/${employee.id}`} // Путь маршрута
              style={{ textDecoration: 'none' }} // Убираем подчеркивание текста
            >
              <ListItemButton>
                {' '}
                {/* Оборачиваем содержимое в ListItemButton */}
                <ListItemText
                  primary={employee.name}
                  secondary={`Посада: ${employee.position}, Магазин: ${getStoreName(
                    employee.currentStoreId,
                  )}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default EmployeesPage;
