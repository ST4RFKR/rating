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
          display: { xs: 'block', md: 'none' }, // Показывать только на мобильных устройствах
          padding: '8px', // Равномерный отступ внутри
          borderRadius: '50%', // Для круглой формы
          transition: 'background-color 0.3s ease', // Плавный переход цвета
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Легкий эффект подсветки
          },
          '&:focus': {
            outline: 'none', // Убираем стандартную обводку фокуса
          },
        }}>
        <MenuIcon
          sx={{
            fontSize: '24px', // Размер иконки
            display: 'block',
            margin: '0 auto', // Центровка внутри кнопки
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
                  display: 'flex', // Для выравнивания содержимого
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: isActive ? '#1976d2' : '#000',
                  fontWeight: isActive ? 'bold' : 'normal',
                  width: '100%',
                  padding: '12px 16px', // Внутренние отступы
                  boxSizing: 'border-box', // Учитывает границы в ширине
                  borderLeft: isActive ? '4px solid #1976d2' : '4px solid transparent', // Обводка слева
                  transition: 'all 0.3s ease', // Плавный переход
                })}
                onClick={toggleDrawer(false)} // Закрыть меню после клика
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
                display: 'flex', // Для выравнивания содержимого
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
                boxSizing: 'border-box', // Учитывает ширину границы
                transition: 'background-color 0.3s ease', // Плавный переход
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
