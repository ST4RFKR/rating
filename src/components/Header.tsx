import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useAppDispatch } from '../hook/useAppDispatch';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../hook/useAppSelector';

export const Header = ({ handleLogout, changeModeHandler, user }: any) => {
  const appStatus = useAppSelector((state) => state.app.status);
  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Оцінювання працівників</Typography>
        {user && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link to={'/main'}>
              <Button variant="contained" color="secondary">
                Магазини
              </Button>
            </Link>
            <Link to={'/stats'}>
              <Button variant="contained" color="secondary">
                Статистика
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="contained" color="error">
              Вийти
            </Button>
          </Box>
        )}
        <Switch color={'default'} onChange={changeModeHandler} />
      </Toolbar>
      {appStatus === 'loading' && <LinearProgress />}
    </AppBar>
  );
};
