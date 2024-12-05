import { configureStore } from '@reduxjs/toolkit';
import storesReducer from '../features/stores/storesSlice';
import employeesReducer from '../features/employees/employeesSlice';
import ratingsReducer from '../features/rating/ratingSlice';
import { appReducer } from '../appSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    employees: employeesReducer,
    ratings: ratingsReducer,
    app: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
