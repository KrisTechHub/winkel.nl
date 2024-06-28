import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer.js';
import { loadState, saveState } from './localStorage.js';
import productReducer from './productSlice.js'

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer
        // Add other reducers here if needed
    },
    preloadedState
});

// Save the state to localStorage whenever it changes
store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});