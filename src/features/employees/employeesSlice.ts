import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Dispatch } from 'redux';
import { setAppStatus } from '../../appSlice';

export const fetchEmployee = createAsyncThunk(
  'employee/fetchEmployee',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employees = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        dispatch(setAppStatus({ status: 'succeeded' }));
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
          address: data.address,
        } as employeeType;
      });

      return employees;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке данных');
    }
  },
);
export const updateEmployee = createAsyncThunk(
  'employee/fetchEmployee',
  async ({ employeeId, newData }: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const itemRef = doc(db, 'ratings', employeeId);
      await updateDoc(itemRef, newData);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return { id: employeeId, ...newData };
    } catch (error: any) {
      return rejectWithValue(error.message);
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
  performanceScores: {
    [key: string]: string[];
  };
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
