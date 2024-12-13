import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const fetchFromFirestore = async (document: string) => {
  const querySnapshot = await getDocs(collection(db, document));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
