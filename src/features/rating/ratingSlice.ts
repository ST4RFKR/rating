import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { setAppStatus } from '../../appSlice';

export const fetchRatings = createAsyncThunk(
  'employee/fetchRatings',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const querySnapshot = await getDocs(collection(db, 'ratings'));
      const ratings = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        dispatch(setAppStatus({ status: 'succeeded' }));
        return {
          id: doc.id,
          employeeId: data.employeeId || '',
          store: {
            id: data.store?.id || '',
            name: data.store?.name || '',
          },
          date: data.date || '',
          time: data.time || '',
          score: data.score || 0,
          comment: data.comment || '',
          videoUrl: data.videoUrl || '',
        } as ratingType;
      });

      return ratings;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке рейтингов');
    }
  },
);
export const createRating = createAsyncThunk(
  'ratings/createRatings',
  async (newRating: ratingType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      await setDoc(doc(db, 'ratings', newRating.id), newRating);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return newRating;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при добавлении нового рейтинга');
    }
  },
);
export const deleteRating = createAsyncThunk(
  'ratings/deleteRating',
  async (ratingId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const itemRef = doc(db, 'ratings', ratingId);
      await deleteDoc(itemRef);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return ratingId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const chengeRating = createAsyncThunk(
  'ratings/updateRating',
  async ({ ratingId, newData }: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const itemRef = doc(db, 'ratings', ratingId);
      await updateDoc(itemRef, newData);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return { id: ratingId, ...newData };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// import axios from 'axios';
// export const fetchRatings = createAsyncThunk(
//   'employee/fetchRatings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://ab3611e09d40cfd3.mokky.dev/ratings');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Произошла ошибка при загрузке данных');
//     }
//   },
// );
// export const createRating = createAsyncThunk(
//   'employee/createRating',
//   async (newRating: addNewRatingActionType['payload'], { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://ab3611e09d40cfd3.mokky.dev/ratings', newRating);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Ошибка при добавлении нового рейтинга');
//     }
//   },
// );
export type ratingType = {
  id: string;
  employeeId: string;
  store: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
  score: number;
  comment: string;
  videoUrl: string;
};
type initialStateType = {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  ratings: ratingType[];
};
type addNewRatingActionType = {
  payload: {
    id: string;
    store: {
      id: string;
      name: string;
    };
    employeeId: string;
    date: string;
    time: string;
    score: number;
    comment: string;
    videoUrl: string;
  };
};
const initialState: initialStateType = {
  status: 'idle',
  ratings: [],
};

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    addNewRating: (state: initialStateType, action: addNewRatingActionType) => {
      return {
        ...state,
        ratings: [...state.ratings, { ...action.payload }],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //ДОБАВЛЕНИЕ ПОЛУЧЕНИЯ РЕЙТИНГА
      .addCase(fetchRatings.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchRatings.fulfilled, (state: initialStateType, action) => {
        state.status = 'succeeded';
        state.ratings = action.payload;
      })
      // ДОБАВЛЕНИЕ НОВОГО РЕЙТИНГА
      .addCase(createRating.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings.push(action.payload);
      });
    //УДАЛЯЕМ РЕЙТИНГ ПО ID
    builder
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings = state.ratings.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteRating.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(chengeRating.fulfilled, (state, action) => {
        const { id, ...data } = action.payload;
        state.status = 'succeeded';
        state.ratings = state.ratings.map((rating) =>
          rating.id === id ? { ...rating, ...data } : rating,
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const { addNewRating } = ratingsSlice.actions;

export default ratingsSlice.reducer;
