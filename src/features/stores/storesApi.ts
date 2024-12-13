import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { baseApi } from '../employees/baseApi';
import { db } from '../../firebase/firebaseConfig';
import { fetchFromFirestore } from '../../components/utils/fethFromFireStore';

export const storesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const data = await fetchFromFirestore('stores');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } };
        }
      },
      providesTags: ['Stores'],
    }),
    getSingleStore: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, 'stores', id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Stores'],
    }),
    addStore: builder.mutation<any, any>({
      async queryFn(newStore) {
        try {
          await setDoc(doc(db, 'stores', newStore.id), newStore);
          return { data: newStore };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores', 'Ratings'],
    }),
    updateStore: builder.mutation({
      async queryFn({ id, updatedData }) {
        try {
          const docRef = doc(db, 'stores', id);
          await updateDoc(docRef, updatedData);
          return { data: { ...updatedData } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores'],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useAddStoreMutation,
  useGetSingleStoreQuery,
  useUpdateStoreMutation,
} = storesApi;
