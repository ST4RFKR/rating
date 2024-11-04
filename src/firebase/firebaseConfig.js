// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Имп// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD59cBVmDswgKCbCsMu3sg-dvVtuZcSmI8',
  authDomain: 'test-6866d.firebaseapp.com',
  projectId: 'test-6866d',
  storageBucket: 'test-6866d.firebasestorage.app',
  messagingSenderId: '261416140298',
  appId: '1:261416140298:web:a7dfc5c1f618c05c56e9f3',
  measurementId: 'G-NGTTK1ET50',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app); // Auth (если используется)
