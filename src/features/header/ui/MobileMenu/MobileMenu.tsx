import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/main', label: 'Магазини' },
  { to: '/employees', label: 'Працівники' },
  { to: '/stats', label: 'Статистика' },
];

const MobileMenu = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  return (
    <>
      {/* Кнопка для открытия меню */}
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{
          display: { xs: 'block', md: 'none' },
          padding: '8px',
          borderRadius: '50%',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:focus': {
            outline: 'none',
          },
        }}>
        <MenuIcon
          sx={{
            fontSize: '24px',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </IconButton>

      {/* Drawer для мобильного меню */}
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {navLinks.map((link) => (
            <ListItem key={link.to} disablePadding>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: isActive ? '#1976d2' : '#000',
                  fontWeight: isActive ? 'bold' : 'normal',
                  width: '100%',
                  padding: '12px 16px',
                  boxSizing: 'border-box',
                  borderLeft: isActive ? '4px solid #1976d2' : '4px solid transparent',
                  transition: 'all 0.3s ease',
                })}
                onClick={toggleDrawer(false)}
              >
                {link.label}
              </NavLink>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding>
            <button
              onClick={() => {
                handleLogout();
                toggleDrawer(false)();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'red',
                fontWeight: 'bold',
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ffe5e5')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
              Вийти
            </button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MobileMenu;
