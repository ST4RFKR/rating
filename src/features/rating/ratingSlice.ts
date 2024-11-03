import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
type ratingType = {
  id: string;
  employeeId: string;
  storeId: string;
  date: string;
  time: string;
  score: number;
  comment: string;
  videoUrl: string;
};
const initialState: ratingType[] = [
  {
    id: 'rating_1',
    employeeId: 'employee_1',
    storeId: 'store_1',
    date: '2024-10-01',
    time: '18:00',
    score: 4,
    comment: 'Хорошая работа!',
    videoUrl: 'http://example.com/video1',
  },
  {
    id: 'rating_2',
    employeeId: 'employee_1',
    storeId: 'store_1',
    date: '2024-10-05',
    time: '18:00',
    score: 5,
    comment: 'Отлично!',
    videoUrl: 'http://example.com/video2',
  },
  {
    id: 'rating_3',
    employeeId: 'employee_2',
    storeId: 'store_1',
    date: '2024-10-02',
    time: '18:00',
    score: 3,
    comment: 'Есть над чем поработать.',
    videoUrl: 'http://example.com/video3',
  },
  {
    id: 'rating_4',
    employeeId: 'employee_4',
    storeId: 'store_2',
    date: '2024-10-03',
    time: '18:00',
    score: 5,
    comment: 'Превосходно!',
    videoUrl: 'http://example.com/video4',
  },
  {
    id: 'rating_4',
    employeeId: 'employee_4',
    storeId: 'store_2',
    date: '2024-10-03',
    time: '18:00',
    score: 1,
    comment: '',
    videoUrl: 'http://example.com/video4',
  },
  {
    id: 'rating_5',
    employeeId: 'employee_5',
    storeId: 'store_2',
    date: '2024-10-04',
    time: '18:00',
    score: 4,
    comment: 'Хороший результат.',
    videoUrl: 'http://example.com/video5',
  },
  {
    id: 'rating_6',
    employeeId: 'employee_6',
    storeId: 'store_2',
    date: '2024-10-06',
    time: '18:00',
    score: 2,
    comment: 'Необходимо улучшение.',
    videoUrl: 'http://example.com/video6',
  },
  {
    id: 'rating_7',
    employeeId: 'employee_7',
    storeId: 'store_3',
    date: '2024-10-01',
    time: '18:00',
    score: 4,
    comment: 'Неплохо.',
    videoUrl: 'http://example.com/video7',
  },
  {
    id: 'rating_8',
    employeeId: 'employee_8',
    storeId: 'store_3',
    date: '2024-10-02',
    time: '18:00',
    score: 3,
    comment: 'Средний уровень.',
    videoUrl: 'http://example.com/video8',
  },
  {
    id: 'rating_9',
    employeeId: 'employee_9',
    storeId: 'store_4',
    date: '2024-10-03',
    time: '18:00',
    score: 5,
    comment: 'Отличный подход!',
    videoUrl: 'http://example.com/video9',
  },
  {
    id: 'rating_10',
    employeeId: 'employee_10',
    storeId: 'store_4',
    date: '2024-10-04',
    time: '18:00',
    score: 4,
    comment: 'Хорошая работа.',
    videoUrl: 'http://example.com/video10',
  },
];

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    addNewRating: (state, action) => {
      const { id, employeeId, storeId, date, time, score, comment, videoUrl } = action.payload;
      const newFeedback = { id, employeeId, storeId, date, time, score, comment, videoUrl };
      return [...state, newFeedback];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewRating } = ratingsSlice.actions;

export default ratingsSlice.reducer;
