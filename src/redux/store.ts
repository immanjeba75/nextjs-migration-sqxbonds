// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Changed import
import rootReducer from './reducers';

// Define AppDispatch type before using store
type AppDispatch = any; // Temporary type

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>   
    getDefaultMiddleware().concat(thunk), // Use thunk instead of thunkMiddleware
  devTools: process.env.NODE_ENV !== 'production'
});

// Now redefine with the correct type
export type RootState = ReturnType<typeof rootReducer>;
export type { AppDispatch }; // Export type
// Update AppDispatch with the store instance
export { store as default };