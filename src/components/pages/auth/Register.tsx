import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebaseConfig';

import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
      alert('User registered successfully');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center">
          Register
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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
