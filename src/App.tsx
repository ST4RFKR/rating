import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { Box, Button } from '@mui/material';
import Main from './pages/Main';
import StorePage from './components/StorePage';
import EmployeePage from './components/EmployeePage';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';
import AuthPage from './components/AuthPage';
import { collection, DocumentData, getDocs } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [roleCurrentUser, setRoleCurrentUser] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [path, setPath] = useState<any>('');

  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersArray = querySnapshot.docs.map((doc) => doc.data());
    setUsers(usersArray);
  }

  useEffect(() => {
    const currentUid = getAuth().currentUser?.uid;
    if (currentUid && users.length > 0) {
      const currentUserData = users.find((el) => el.uid === currentUid);
      setRoleCurrentUser(currentUserData ? currentUserData.role : null);
    }
  }, [users]);

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('User logged out successfully');
      setRoleCurrentUser(null);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };
  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  function getPath(path: string) {
    setPath(path);
  }

  return (
    <div className="App">
      <Box>
        {user && (
          <Button sx={{ m: '10px' }} variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        )}
        <Box>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/main" /> : <AuthPage />} />
            <Route
              path="/main"
              element={<Main roleCurrentUser={roleCurrentUser} getUsers={getUsers} />}
            />
            <Route path="/store/:id" element={<StorePage getPath={getPath} />} />
            <Route path="/employee/:id" element={<EmployeePage path={path} />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
