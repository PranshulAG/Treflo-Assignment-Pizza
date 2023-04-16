import { configureStore } from "@reduxjs/toolkit";
import pizzaSliceReducer from "./pizzaSlice";

export const myStore = configureStore({
  reducer: {
        pizza: pizzaSliceReducer,
  },
});
