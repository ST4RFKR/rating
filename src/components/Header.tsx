import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useAppDispatch } from '../hook/useAppDispatch';
import { Box, Button } from '@mui/material';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';

export const Header = ({ handleLogout }: any) => {
  const dispatch = useAppDispatch();

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link to={'/main'}>
            <Button
              sx={{ color: 'black', border: '1px solid black' }}
              color="secondary"
              variant="outlined">
              Магазини
            </Button>
          </Link>
          <Link to={'/stats'}>
            <Button
              sx={{ color: 'black', border: '1px solid black' }}
              color="secondary"
              variant="outlined">
              Статистика
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="outlined" color="error">
            Вийти
          </Button>
          <Switch color={'default'} onChange={() => {}} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
