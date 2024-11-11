import { Box, Button, Paper } from '@mui/material';
import { useState } from 'react';

import Register from "./Register";
import Login from "./Login";


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
          <Button variant={isLogin ? 'contained' : 'outlined'} onClick={() => setIsLogin(true)}>
            Login
          </Button>
          <Button variant={!isLogin ? 'contained' : 'outlined'} onClick={() => setIsLogin(false)}>
            Register
          </Button>
        </Box>
        {isLogin ? <Login /> : <Register />}
      </Paper>
    </Box>
  );
}

export default AuthPage;
