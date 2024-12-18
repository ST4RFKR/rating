import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { fetchFromFirestore } from '../../../components/common/utils/fethFromFireStore';
import { baseApi } from '../../employees/api/baseApi';
import { db } from '../../../firebase/firebaseConfig';

export const ratingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRatingsByDate: builder.query<any[], { startDate: string | null; endDate: string | null }>({
      queryFn: async ({ startDate, endDate }) => {
        try {
          let ratingsQuery: any = collection(db, 'ratings');

          if (startDate && endDate) {
            ratingsQuery = query(
              ratingsQuery,
              where('date', '>=', startDate),
              where('date', '<=', endDate),
            );
          }

          const snapshot = await getDocs(ratingsQuery);
          const data = snapshot.docs.map((doc) => doc.data());

          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } };
        }
      },
      providesTags: ['Ratings'],
    }),
    getRatings: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const data = await fetchFromFirestore('ratings');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } };
        }
      },
      providesTags: ['Ratings'],
    }),
    addRating: builder.mutation<any, any>({
      async queryFn(newRating) {
        try {
          await setDoc(doc(db, 'ratings', newRating.id), newRating);
          return { data: newRating };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores', 'Ratings'],
    }),
    updateRating: builder.mutation({
      async queryFn({ id, updatedData }) {
        try {
          const docRef = doc(db, 'ratings', id);
          await updateDoc(docRef, updatedData);
          return { data: { ...updatedData } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores', 'Ratings'],
    }),
    deleteRating: builder.mutation<any, string>({
      async queryFn(id) {
        try {
          const docRef = doc(db, 'ratings', id);
          await deleteDoc(docRef);
          return { data: { success: true } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores', 'Ratings'],
    }),
  }),
});

export const {
  useGetRatingsQuery,
  useAddRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useGetRatingsByDateQuery,
} = ratingsApi;
