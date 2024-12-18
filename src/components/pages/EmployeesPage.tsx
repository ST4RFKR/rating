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
import { useAbility } from '../casl/useAbility';
import { Can } from '@casl/react';
import SearchInput from '../UI/input/SearchInput';

const EmployeesPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: stores } = useGetStoresQuery();
  const { data: employees } = useGetEmployeesQuery();

  const getStoreName = (storeId: string) => {
    const store = stores?.find((s) => s.id === storeId);
    return store ? store.name : 'Позаштатний працівник';
  };

  const ability = useAbility();

  // Фільтрація працівників за магазином і пошуковим запитом
  const filteredEmployees = employees
    ?.filter((emp) => selectedStore === 'all' || emp.currentStoreId === selectedStore)
    .filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
        <Can I="create" a="Article" ability={ability}>
          <Button onClick={() => setOpen(true)} variant="contained" color="secondary">
            Створити нового працівника
          </Button>
        </Can>
      </Box>

      {/* Пошук */}
      <Box sx={{ mb: 2 }}>
        <SearchInput
          value={{ query: searchQuery, sort: '' }}
          onChange={({ query }) => setSearchQuery(query)}
          placeholder="Введіть ім'я працівника..."
        />
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
          Сотрудники не знайдені.
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
