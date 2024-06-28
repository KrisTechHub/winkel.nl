// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER}/products`);
    return res.data;
});

// Async thunk for deleting a product
export const deleteProducts = createAsyncThunk('products/deleteProducts', async (productId) => {
    await axios.delete(`${import.meta.env.VITE_SERVER}/products/${productId}`);
    return productId; // Return the productId to use it in the reducer
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Handling fetchProducts thunk
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handling deleteProducts thunk
            .addCase(deleteProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
