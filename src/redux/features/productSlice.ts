import { createSlice } from "@reduxjs/toolkit";

type initState = {}[];

const initialState: initState = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
