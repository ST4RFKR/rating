import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type storesType = {
  id: string;
  name: string;
  location: string;
  employees: string[];
};
export type addStoreActionType = {
  payload: {
    id: string;
    name: string;
    location: string;
    employees: string[];
  };
};

const initialState: storesType[] = [
  {
    id: 'store_1',
    name: 'Магазин 1',
    location: 'Город А',
    employees: ['employee_1', 'employee_2', 'employee_3'],
  },
  {
    id: 'store_2',
    name: 'Магазин 2',
    location: 'Город Б',
    employees: ['employee_4', 'employee_5', 'employee_6'],
  },
];

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state: storesType[], action: addStoreActionType) => {
      return [...state, { ...action.payload }];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addStore } = storesSlice.actions;

export default storesSlice.reducer;
