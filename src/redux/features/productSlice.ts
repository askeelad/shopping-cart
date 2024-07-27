import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productProps {
  id: number;
  quantity: number;
  stock: number;
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
    increaseQuantity(
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) {
      state.product.filter((item, key) => {
        if (item.id == action.payload.id)
          state.product[key].stock =
            state.product[key].stock + action.payload.qty;
      });
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      state.product.map((item, key) => {
        if (item.id == action.payload) state.product[key].stock--;
      });
    },
  },
});

export const { allProducts, increaseQuantity, decreaseQuantity } =
  productSlice.actions;
export default productSlice.reducer;
