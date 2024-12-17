import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useAppSelector } from '../hook/useAppSelector';
import NavButtons from './NavButtons';
import MobileMenu from './MobileMenu';

export const Header = ({ handleLogout, changeModeHandler, user }: any) => {
  const appStatus = useAppSelector((state) => state.app.status);

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {user && <MobileMenu handleLogout={handleLogout} />}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ fontSize: '24px', marginRight: '10px' }}>🏵️</Box>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', color: '#fff' }}>
            Ефективність
          </Typography>
        </Box>
        {user && (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {' '}
            {/* Скрываем на мобильных */}
            <NavButtons handleLogout={handleLogout} />
          </Box>
        )}
        <Switch color="default" onChange={changeModeHandler} />
      </Toolbar>
      {appStatus === 'loading' && <LinearProgress />}
    </AppBar>
  );
};
