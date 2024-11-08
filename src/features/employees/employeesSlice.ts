import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const fetchEmployee = createAsyncThunk(
  'employee/fetchEmployee',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employees = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || '',
          currentStoreId: data.currentStoreId || '',
          position: data.position || '',
          hireDate: data.hireDate || '',
          email: data.email || '',
          phone: data.phone || '',
          performanceScores: data.performanceScores || [],
          averageScore: data.averageScore || null,
          address: data.adress,
        } as employeeType;
      });

      return employees;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке данных');
    }
  },
);
// export const fetchEmployee = createAsyncThunk(
//   'employee/fetchEmployee',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://ab3611e09d40cfd3.mokky.dev/employees');

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Произошла ошибка при загрузке данных');
//     }
//   },
// );
export type initialStateType = {
  employee: employeeType[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};
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
const initialState: initialStateType = {
  status: 'idle',
  employee: [],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchEmployee.fulfilled, (state: initialStateType, action) => {
        state.status = 'succeeded';
        state.employee = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
