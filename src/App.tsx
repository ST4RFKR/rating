import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { Box, Button } from '@mui/material';
import Main from './pages/Main';
import StorePage from './components/StorePage';
import EmployeePage from './components/EmployeePage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import AuthPage from './components/AuthPage';

function App() {
  const [user, setUser] = useState<any>(null);
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
            <Route path="/main" element={<Main />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/employee/:id" element={<EmployeePage />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
