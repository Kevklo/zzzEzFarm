import { configureStore } from "@reduxjs/toolkit";
import { inventorySlice } from "./inventory/inventorySlice";
import { apiDataSlice } from "./apiData/apiDataSlice";
    
export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
    apiData: apiDataSlice.reducer,
  }

})