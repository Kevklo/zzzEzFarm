import { configureStore } from "@reduxjs/toolkit";
import { inventorySlice } from "./inventory/inventorySlice";
import { apiDataSlice } from "./apiData/apiDataSlice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('inventory/')) {
    localStorage.setItem('inventoryState', JSON.stringify(store.getState().inventory));
  }
  return result;
};

export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
    apiData: apiDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware)
});