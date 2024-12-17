import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItemButton,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { useGetStoresQuery } from '../../features/stores/storesApi';
import Modal from '../Modal';
import AddEmployeeForm from '../form/AddEmployeeForm';

const EmployeesPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('all'); // Стан для фільтрації магазину

  const { data: stores } = useGetStoresQuery();
  const { data: employees } = useGetEmployeesQuery();

  const getStoreName = (storeId: string) => {
    const store = stores?.find((s) => s.id === storeId);
    return store ? store.name : 'Позаштатний працівник';
  };

  // Фільтрація працівників за обраним магазином
  const filteredEmployees =
    selectedStore === 'all'
      ? employees
      : employees?.filter((emp) => emp.currentStoreId === selectedStore);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Список працівників
      </Typography>

      {/* Select для вибору магазину */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="store-select-label">Магазин</InputLabel>
          <Select
            labelId="store-select-label"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            label="Магазин">
            <MenuItem value="all">Всі магазини</MenuItem>
            {stores?.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => setOpen(true)} variant="contained" color="secondary">
          Створити нового працівника
        </Button>
      </Box>

      {/* Модалка для додавання працівника */}
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        decription={'Создать нового сотрудника'}>
        <AddEmployeeForm handleClose={setOpen} />
      </Modal>

      {/* Відображення списку працівників */}
      {filteredEmployees?.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Сотрудники не найдены.
        </Typography>
      ) : (
        <List>
          {filteredEmployees?.map((employee) => (
            <React.Fragment key={employee.id}>
              <ListItem
                component={Link}
                to={`/employees/${employee.id}`}
                style={{ textDecoration: 'none' }}>
                <ListItemButton>
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
      )}
    </Box>
  );
};

export default EmployeesPage;
