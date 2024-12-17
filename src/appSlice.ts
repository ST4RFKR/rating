import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'light';
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type Notification = {
  message: string;
  open: boolean;
  severity: 'success' | 'error' | 'info' | 'warning';
};
export type Role = 'user' | 'admin';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    error: null as string | null,
    status: 'idle' as RequestStatus,
    role: 'user' as Role,
    isInitialized: true,
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

    setAppError: (state, action) => {
      state.error = action.payload.error;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
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
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      });
  },
  selectors: {
    notificationSelector: (state) => state.notification,
    isInitializedSelector: (state) => state.isInitialized,
    roleSelector: (state) => state.role,
  },
});
export const { notificationSelector, isInitializedSelector, roleSelector } = appSlice.selectors;
export const {
  setRole,
  changeTheme,
  setAppError,
  showNotification,
  hideNotification,
  setIsInitialized,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
