import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GroupOrderState {
  groupedOrders: string[];
  targetOrders: number;
  isGroupComplete: boolean;
}

const initialState: GroupOrderState = {
  groupedOrders: [],
  targetOrders: 5,
  isGroupComplete: false,
};

const groupOrderSlice = createSlice({
  name: "groupOrder",
  initialState,
  reducers: {
    addToGroup: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (!state.groupedOrders.includes(productId) && state.groupedOrders.length < state.targetOrders) {
        state.groupedOrders.push(productId);
        state.isGroupComplete = state.groupedOrders.length >= state.targetOrders;
      }
    },
    removeFromGroup: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.groupedOrders = state.groupedOrders.filter((id) => id !== productId);
      state.isGroupComplete = state.groupedOrders.length >= state.targetOrders;
    },
    clearGroup: (state) => {
      state.groupedOrders = [];
      state.isGroupComplete = false;
    },
    completeGroupOrder: (state) => {
      state.groupedOrders = [];
      state.isGroupComplete = false;
    },
  },
});

export const { addToGroup, removeFromGroup, clearGroup, completeGroupOrder } = groupOrderSlice.actions;
export default groupOrderSlice.reducer;
