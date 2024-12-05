import { createSlice } from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'light';
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type Notification = {
  message: string;
  open: boolean;
  severity: 'success' | 'error' | 'info' | 'warning'; // типы уведомлений
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    error: null as string | null,
    status: 'idle' as RequestStatus,
    notification: {
      message: '',
      open: false,
      severity: 'success' as 'success' | 'error' | 'info' | 'warning',
    } as Notification, // Добавляем состояние для уведомлений
  },
  reducers: {
    changeTheme: (state, action) => {
      state.themeMode = action.payload.themeMode;
    },
    setAppStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action) => {
      state.error = action.payload.error;
    },
    // Обработчик для отображения уведомлений
    showNotification: (
      state,
      action: { payload: { message: string; severity: 'success' | 'error' | 'info' | 'warning' } },
    ) => {
      state.notification.message = action.payload.message;
      state.notification.severity = action.payload.severity;
      state.notification.open = true;
    },
    hideNotification: (state) => {
      state.notification.open = false;
      state.notification.message = '';
    },
  },
});

export const { changeTheme, setAppError, setAppStatus, showNotification, hideNotification } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
