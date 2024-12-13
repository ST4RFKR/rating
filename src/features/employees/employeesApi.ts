// services/todoApi.js
import { fetchFromFirestore } from '../../components/utils/fethFromFireStore';
import { db } from '../../firebase/firebaseConfig';
import { baseApi, firestoreDb } from './baseApi';
import { updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const data = await fetchFromFirestore('employees');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } };
        }
      },
      providesTags: ['Employees'],
    }),
    addEmployees: builder.mutation<any, any>({
      async queryFn(newEmployee) {
        try {
          await setDoc(doc(db, 'employees', newEmployee.id), newEmployee);
          return { data: { newEmployee } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores', 'Ratings'],
    }),
    updateEmployees: builder.mutation({
      async queryFn({ id, ...updatedData }) {
        try {
          const docRef = doc(db, 'employees', id);
          await updateDoc(docRef, updatedData);
          return { data: { ...updatedData } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores'],
    }),
    deleteEmployees: builder.mutation({
      async queryFn(id) {
        try {
          const docRef = doc(firestoreDb, 'todos', id);
          await deleteDoc(docRef);
          return { data: id };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees', 'Stores'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeesMutation,
  useDeleteEmployeesMutation,
  useUpdateEmployeesMutation,
} = employeesApi;
