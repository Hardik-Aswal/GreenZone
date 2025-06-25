import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductDetail } from "../types/product";

export interface CartItem extends ProductDetail {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductDetail>) => {
      const p = action.payload;
      const existing = state.items.find((i) => i.id === p.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...p, quantity: 1 });
      }
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => {
        const orig = i.originalPrice;
        const discountAmt = (i.discount * orig) / 100;
        const unitPrice = orig - discountAmt;
        return sum + unitPrice * i.quantity;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => {
        const orig = i.originalPrice;
        const discountAmt = (i.discount * orig) / 100;
        const unitPrice = orig - discountAmt;
        return sum + unitPrice * i.quantity;
      }, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => {
        const orig = i.originalPrice;
        const discountAmt = (i.discount * orig) / 100;
        const unitPrice = orig - discountAmt;
        return sum + unitPrice * i.quantity;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
