import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, useTheme } from '@mui/system';

const navLinks = [
  { to: '/main', label: 'Магазини' },
  { to: '/employees', label: 'Працівники' },
  { to: '/stats', label: 'Статистика' },
];

const NavButtons = ({ handleLogout }: { handleLogout: () => void }) => {
  const theme = useTheme(); // Отримуємо поточну тему
  const linkColor = theme.palette.mode === 'dark' ? '#bdbdbd' : '#ffffff'; // Колір для неактивної лінки
  const activeLinkColor = theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2'; // Колір для активної лінки

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            display: 'inline-block',
            padding: '8px 16px',
            textDecoration: 'none',
            color: isActive ? '#ffffff' : linkColor, // Активний колір тексту
            borderBottom: isActive ? '2px solid #fff' : 'none',
            transition: 'all 0.3s ease', // Плавний перехід
            fontWeight: isActive ? 'bold' : 'normal', // Жирний текст для активної лінки
          })}>
          {link.label}
        </NavLink>
      ))}
      <span
        style={{
          cursor: 'pointer',
          padding: '10px 20px',
          color: 'red',
          textDecoration: 'none',
        }}
        onClick={handleLogout}>
        Вийти
      </span>
    </Box>
  );
};

export default NavButtons;
