import { createTheme } from '@mui/material/styles';
import { ThemeMode } from './appSlice';

export const getTheme = (themeMode: ThemeMode) => {
  const isDark = themeMode === 'dark';

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#1876D1', // основной цвет
      },
    },
    typography: {
      h1: {
        color: isDark ? '#FFFFFF' : '#000',
      },
      h2: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      h3: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      h4: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      h5: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      h6: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      body1: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      body2: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
    },
    components: {
      // IconButton
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? '#FFFFFF' : '#000000', // цвет иконок
            '&:hover': {
              backgroundColor: isDark ? '#444' : '#e0e0e0', // фон при наведении
            },
          },
        },
      },

      // Input и OutlinedInput
      MuiInput: {
        styleOverrides: {
          root: {
            color: isDark ? '#FFFFFF' : '#000000', // цвет текста
            '& .MuiInput-underline:before': {
              borderBottomColor: isDark ? '#B0BEC5' : '#757575', // цвет нижней границы
            },
            '& .MuiInput-underline:hover:before': {
              borderBottomColor: isDark ? '#FFFFFF' : '#000000', // цвет нижней границы при наведении
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: isDark ? '#087EA4' : '#087EA4', // цвет нижней границы после фокуса
            },
          },
        },
      },

      // OutlinedInput (если используете его)
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: isDark ? '#FFFFFF' : '#000000', // цвет текста
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#B0BEC5' : '#757575', // цвет границы
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#087EA4' : '#087EA4', // цвет границы при наведении
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#087EA4' : '#087EA4', // цвет границы при фокусе
            },
          },
        },
      },

      // Checkbox
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isDark ? '#FFFFFF' : '#000000', // цвет галочки
            '&.Mui-checked': {
              color: isDark ? '#087EA4' : '#087EA4', // цвет при активной галочке
            },
            '&:hover': {
              backgroundColor: isDark ? '#444' : '#e0e0e0', // фон при наведении
            },
          },
        },
      },

      // Button
      MuiButton: {
        styleOverrides: {
          root: {
            color: isDark ? '#FFFFFF' : '#000000', // основной цвет текста кнопки
            '&:hover': {
              backgroundColor: isDark ? '#444' : '#e0e0e0', // цвет фона кнопки при наведении
            },
          },
        },
      },
    },
  });
};
