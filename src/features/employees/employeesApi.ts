// services/todoApi.js
import { db } from '../../firebase/firebaseConfig';
import { baseApi, firestoreDb } from './baseApi';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const fetchEmployeesFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, 'employees'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const data = await fetchEmployeesFromFirestore();
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
          await addDoc(collection(db, 'employees'), newEmployee);
          return { data: { newEmployee } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees'],
    }),
    updateEmployees: builder.mutation({
      async queryFn({ id, ...updatedData }) {
        try {
          const docRef = doc(db, 'todos', id);
          await updateDoc(docRef, updatedData);
          return { data: { ...updatedData } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Employees'],
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
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeesMutation,
  useDeleteEmployeesMutation,
  useUpdateEmployeesMutation,
} = employeesApi;
