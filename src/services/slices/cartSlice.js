import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveCartToStorage = (state) => {
    try {
        const cartState = {
            items: state.items,
            totalAmount: state.totalAmount,
            totalItems: state.totalItems
        };
        localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            return {
                items: parsedCart.items || [],
                totalAmount: parsedCart.totalAmount || 0,
                totalItems: parsedCart.totalItems || 0
            };
        }
        return {
            items: [],
            totalAmount: 0,
            totalItems: 0
        };
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return {
            items: [],
            totalAmount: 0,
            totalItems: 0
        };
    }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
            }

            // Update totals and save to storage
            cartSlice.caseReducers.updateTotals(state);
            saveCartToStorage(state);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            cartSlice.caseReducers.updateTotals(state);
            saveCartToStorage(state);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            
            if (item) {
                item.quantity = Math.max(1, quantity);
                cartSlice.caseReducers.updateTotals(state);
                saveCartToStorage(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            saveCartToStorage(state);
        },

        updateTotals: (state) => {
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
            state.totalItems = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
