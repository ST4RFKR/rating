// services/baseApi.js
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFirestore } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

// Общий API для всех Firebase-запросов
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fakeBaseQuery(), // Можно заменить на fetchBaseQuery для REST API
  tagTypes: ['Employees', 'Stores', 'Ratings'], // Общие теги для кеширования
  endpoints: () => ({}), // Позже мы добавим конкретные API
});

// Экспортируем Firebase DB, чтобы использовать в других API
export const firestoreDb = db;
