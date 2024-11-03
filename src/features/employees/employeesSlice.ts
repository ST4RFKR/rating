import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export type employeeType = {
  id: string;
  name: string;
  currentStoreId: string;
  position: string;
  hireDate: string;
  email: string;
  phone: string;
  performanceScores: [];
  averageScore: null;
  address: string;
};
const initialState: employeeType[] = [
  {
    id: 'employee_1',
    name: 'Иванов Иван',
    currentStoreId: 'store_1',
    position: 'Менеджер',
    hireDate: '2023-01-15',
    email: 'ivanov@example.com',
    phone: '123-456-789',
    performanceScores: [],
    averageScore: null, // Средний результат
    address: 'Город А, Улица 1, д. 1',
  },
  {
    id: 'employee_2',
    name: 'Петров Петр',
    currentStoreId: 'store_1',
    position: 'Кассир',
    hireDate: '2023-02-20',
    email: 'petrov@example.com',
    phone: '987-654-321',
    performanceScores: [],
    averageScore: null,
    address: 'Город А, Улица 2, д. 2',
  },
  {
    id: 'employee_3',
    name: 'Сидоров Сидор',
    currentStoreId: 'store_1',
    position: 'Продавец',
    hireDate: '2023-03-10',
    email: 'sidorov@example.com',
    phone: '555-123-456',
    performanceScores: [],
    averageScore: null,
    address: 'Город А, Улица 3, д. 3',
  },
  {
    id: 'employee_4',
    name: 'Кузнецов Алексей',
    currentStoreId: 'store_2',
    position: 'Кассир',
    hireDate: '2023-04-05',
    email: 'kuznetsov@example.com',
    phone: '333-444-555',
    performanceScores: [],
    averageScore: null,
    address: 'Город Б, Улица 1, д. 1',
  },
  {
    id: 'employee_5',
    name: 'Смирнова Анна',
    currentStoreId: 'store_2',
    position: 'Менеджер',
    hireDate: '2023-05-15',
    email: 'smirnova@example.com',
    phone: '666-777-888',
    performanceScores: [],
    averageScore: null,
    address: 'Город Б, Улица 2, д. 2',
  },
  {
    id: 'employee_6',
    name: 'Попова Наталья',
    currentStoreId: 'store_2',
    position: 'Продавец',
    hireDate: '2023-06-01',
    email: 'popova@example.com',
    phone: '999-000-111',
    performanceScores: [],
    averageScore: null,
    address: 'Город Б, Улица 3, д. 3',
  },
  {
    id: 'employee_7',
    name: 'Федоров Максим',
    currentStoreId: 'store_3',
    position: 'Кассир',
    hireDate: '2023-07-20',
    email: 'fedorov@example.com',
    phone: '222-333-444',
    performanceScores: [],
    averageScore: null,
    address: 'Город В, Улица 1, д. 1',
  },
];

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
