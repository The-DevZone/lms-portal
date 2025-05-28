import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../feachers/authSlice';
import { authApi } from '../feachers/api/authApi';
import rootReducer from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultmiddleware) => getDefaultmiddleware().concat(authApi.middleware),
});