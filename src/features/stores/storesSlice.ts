import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { setAppStatus } from '../../appSlice';

export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const querySnapshot = await getDocs(collection(db, 'stores'));
      const stores = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        dispatch(setAppStatus({ status: 'succeeded' }));

        return {
          id: doc.id,
          name: data.name || '',
          location: data.location || '',
          employees: data.employees || [],
        } as storesType;
      });

      return stores;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке данных');
    }
  },
);
export const createStore = createAsyncThunk(
  'stores/createStore',
  async (newStore: storesType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      await setDoc(doc(db, 'stores', newStore.id), newStore);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return newStore;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при добавлении нового магазина');
    }
  },
);
export const updateStoreEmployees = createAsyncThunk(
  'stores/updateStoreEmployees',
  async (updatedStore: storesType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      await setDoc(doc(db, 'stores', updatedStore.id), updatedStore, { merge: true });
      dispatch(setAppStatus({ status: 'succeeded' }));
      return updatedStore;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при обновлении сотрудников магазина');
    }
  },
);

// export const fetchStores = createAsyncThunk(
//   'employee/fetchStores',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://ab3611e09d40cfd3.mokky.dev/stores');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Произошла ошибка при загрузке данных');
//     }
//   },
// );
// export const createStore = createAsyncThunk(
//   'store/createRating',
//   async (newStore: storesType, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://ab3611e09d40cfd3.mokky.dev/stores', newStore);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Ошибка при добавлении нового рейтинга');
//     }
//   },
// );
// export const updateStore = createAsyncThunk('stores/updateStore', async (store: any) => {
//   const response = await axios.put(`https://ab3611e09d40cfd3.mokky.dev/stores/${store.id}`, store);
//   return response.data;
// });
export type initialStateType = {
  stores: storesType[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};
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

const initialState: initialStateType = {
  status: 'idle',
  stores: [],
};
console.log(initialState.stores);

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    // addStore: (state: storesType[], action: addStoreActionType) => {
    //   return [...state, { ...action.payload }];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchStores.fulfilled, (state: initialStateType, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores.push(action.payload);
      })
      .addCase(updateStoreEmployees.fulfilled, (state, action) => {
        const index = state.stores.findIndex((store) => store.id === action.payload.id);
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = storesSlice.actions;

export default storesSlice.reducer;
