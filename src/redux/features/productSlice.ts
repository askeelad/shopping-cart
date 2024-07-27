import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productProps {
  id: number;
  quantity: number;
}

interface productState {
  product: productProps[];
}
const initialState: productState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProducts(state, action) {
      state.product = action.payload;
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      state.product.map((item, key) => {
        if (item.id === action.payload) state.product[key].quantity++;
      });
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      state.product.map((item, key) => {
        if (item.id === action.payload) state.product[key].quantity--;
      });
    },
  },
});

export const { allProducts, increaseQuantity, decreaseQuantity } =
  productSlice.actions;
export default productSlice.reducer;
