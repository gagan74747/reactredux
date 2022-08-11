import { createSlice } from "@reduxjs/toolkit";
const cartslice = createSlice({
  name: "cartslice",
  initialState: { itemsincart: [], totallength: 0 },
  reducers: {
    addtocart(state, action) {
      const { productId, name, price } = action.payload;
      const existeditem = state.itemsincart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existeditem) {
        existeditem.count++;
        existeditem.totalPrice += +price;
        state.totallength++;
      } else {
        state.itemsincart.push({
          productId,
          name,
          price,
          count: 1,
          totalPrice: +price,
        });
        state.totallength++;
      }
    },
    removefromcart(state, action) {
      const { productId } = action.payload;
      const existeditem = state.itemsincart.find((item) => {
        return item.productId === productId && item.count > 1;
      });
      if (existeditem) {
        existeditem.count--;
        existeditem.totalPrice -= existeditem.price;
        state.totallength--;
      } else {
        state.itemsincart = state.itemsincart.filter((item) => item.productId !== productId);
        state.totallength--;
      }
    },
    fetchedData(state,action){
        const {itemsInCart,totalItemsInBag} = action.payload;
        state.itemsincart=itemsInCart;
        state.totallength = totalItemsInBag;
    }
  },
});
export const cartsliceactions = cartslice.actions;
export default cartslice;
