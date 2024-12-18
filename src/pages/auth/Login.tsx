import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../components/common/hook/useAppDispatch';
import { setIsInitialized, showNotification } from '../../appSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setIsInitialized({ isInitialized: false })); // Сбрасываем состояние
      await signInWithEmailAndPassword(auth, email, password);
      // await getUsers(); // Обновление данных пользователя
      dispatch(showNotification({ message: 'Авторизація успішна!😀', severity: 'success' }));
    } catch (error: any) {
      dispatch(showNotification({ message: error.message, severity: 'error' }));
      console.error(error);
    } finally {
      dispatch(setIsInitialized({ isInitialized: true })); // Гарантированное восстановление состояния
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
