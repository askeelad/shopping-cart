import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartItemPayload {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface cartState {
  numberOfItem: number;
  itemArray: cartItemPayload[];
}

const initialState: cartState = {
  numberOfItem: 0,
  itemArray: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<cartItemPayload>) {
      let check = false;
      if (state.numberOfItem > 0) {
        state.itemArray.map((item, key) => {
          if (item.id == action.payload.id) {
            state.itemArray[key].quantity++;
            state.numberOfItem++;
            check = true;
          }
        });
        if (!check) {
          state.itemArray.push(action.payload);
          state.numberOfItem++;
        }
      } else {
        state.itemArray.push(action.payload);
        state.numberOfItem++;
      }
    },
    remove(state, action: PayloadAction<number>) {
      state.itemArray = state.itemArray.filter((item, key) => {
        if (item.id !== action.payload) return true;
        else {
          if (item.quantity > 1) {
            state.itemArray[key].quantity--;
            state.numberOfItem--;
            return true;
          } else {
            delete state.itemArray[key];
            state.numberOfItem--;
            return false;
          }
        }
      });
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
