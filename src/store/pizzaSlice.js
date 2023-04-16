import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataArray: [],
  loading: true,
  isDataRejected: false,
  filterType: undefined,
  currentDataId: undefined,
  cartArray: [],
};

export const fetchPizza = createAsyncThunk("pizza/fetchPizza", async () => {
  const { data } = await axios.get(
    "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68"
  );

  return data;
});

const pizzaReducer = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setFilterType(state, action) {
      state.filterType = action.payload;
    },
    setCurrentId(state, action) {
      state.currentDataId = action.payload;
    },
    addCartArray(state, action) {
      const { id, quantity } = action.payload;
    
      const dataObj = state.dataArray.find((item) => item.id == id);
      let prevArray = [...state.cartArray];
      const cartobj = {
        id: id,
        quantity: quantity,
        dataObj: dataObj,
      };
      prevArray.push(cartobj);
      state.cartArray = [...prevArray];
    },
    updateCartArray(state, action) {
      const { id, quantity } = action.payload;
     
      let prevArray = [...state.cartArray];
      prevArray = prevArray.map((item) => {
        let newItem = { ...item };
        if (newItem.id == id) {
          newItem.quantity = newItem.quantity + quantity;
        }
        return newItem;
      });
      state.cartArray = [...prevArray];
    },
    addToppingsToCartArray(state, action) {
      const { id, toppings = [], size = [] } = action.payload;
      let prevArray = [...state.cartArray];
      prevArray = prevArray.map((item) => {
        let newItem = { ...item };
        if (newItem.id == id && (toppings.length || size.length)) {
          newItem.toppings = toppings;
          newItem.size = size;
        }
        return newItem;
      });
      state.cartArray = [...prevArray];
    },
    deleteFromCartArray(state, action) {
      const { id, quantity } = action.payload;
      let prevArray = [...state.cartArray];
      const prevItem = prevArray?.find((item) => item.id == id);

      let newQuantity = prevItem?.quantity - quantity;
      if (newQuantity < 1) {
        prevArray = prevArray.filter((item) => item.id != id);
        state.cartArray = [...prevArray];
      } else {
        prevArray = prevArray.map((item) => {
          let newItem = { ...item };
          if (newItem.id == id) {
            newItem.quantity = newQuantity;
          }
          return newItem;
        });
        state.cartArray = [...prevArray];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.dataArray = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.isDataRejected = true;
    });
  },
});
export const {
  setFilterType,
  setCurrentId,
  addToppingsToCartArray,
  updateCartArray,
  addCartArray,
  deleteFromCartArray,
} = pizzaReducer.actions;
export default pizzaReducer.reducer;
