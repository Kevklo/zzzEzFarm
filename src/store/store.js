import { configureStore } from "@reduxjs/toolkit";
import { inventorySlice } from "./inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
  }

})