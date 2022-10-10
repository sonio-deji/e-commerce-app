import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
      } else {
        state.quantity += 1;
        const tempProduct = { ...action.payload, quantity: 1 };
        state.products.push(tempProduct);
      }
    },
    removeItemFromCart: (state, action) => {
      const nextCartItem = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = nextCartItem;
    },
    reduceQuantity(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        state.total += action.payload.price % action.payload.quantity;
      } else if ((state.products[itemIndex].quantity = 1)) {
        const nextCartItem = state.products.filter(
          (item) => item._id !== action.payload._id
        );
        state.products = nextCartItem;
      }
    },
    getTotal(state, action) {
      let { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const total = price * quantity;
          cartTotal.total += total;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const { addProducts, reduceQuantity, getTotal } = cartSlice.actions;
export default cartSlice.reducer;
