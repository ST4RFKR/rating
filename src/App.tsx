import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import Main from './pages/Main';
import StorePage from './features/stores/ui/StorePage';
import EmployeePage from './features/employees/ui/EmployeePage/EmployeePage';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';

import { collection, DocumentData, getDocs } from 'firebase/firestore';
import AuthPage from './pages/auth/AuthPage';
import Stats from './features/stats/ui/Stats';
import { Header } from './features/header/ui/Header';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import {
  changeTheme,
  hideNotification,
  isInitializedSelector,
  notificationSelector,
  roleSelector,
  setRole,
  ThemeMode,
} from './appSlice';
import { getTheme } from './theme';
import { useAppDispatch } from './components/common/hook/useAppDispatch';

import EmployeesPage from './features/employees/ui/EmployeesPage';
import Page404 from './pages/Page404';
import styled from './App.module.css';
import { useAppSelector } from './components/common/hook/useAppSelector';
import { defineAbilityFor } from './components/casl/ability';

function App() {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode);
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(isInitializedSelector);
  const theme = getTheme(themeMode);
  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
  };
  const [users, setUsers] = useState<DocumentData[]>([]);
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
      dispatch(setRole({ role: currentUserData ? currentUserData.role : null }));
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
      dispatch(setRole({ role: null }));
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked && user === null) {
      navigate('/');
    }
  }, [user, authChecked, navigate]);

  function getPath(path: string) {
    setPath(path);
  }

  const notification = useAppSelector(notificationSelector);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  if (!isInitialized) {
    return (
      <div className={styled.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Box>
            <Header handleLogout={handleLogout} changeModeHandler={changeModeHandler} user={user} />
            <Routes>
              <Route path="/" element={user ? <Navigate to="/main" /> : <AuthPage />} />
              <Route path="/main" element={<Main getUsers={getUsers} />} />
              <Route path="/store/:id" element={<StorePage getPath={getPath} />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/employees/:id" element={<EmployeePage />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Box>
          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}>
            <Alert
              onClose={handleCloseNotification}
              severity={notification.severity}
              sx={{ width: '100%' }}>
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
