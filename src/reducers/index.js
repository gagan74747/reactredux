import { configureStore } from "@reduxjs/toolkit";
import uislice from "./uislice";
import cartslice from "./cartslice";
const store = configureStore({
    reducer:{
        ui:uislice.reducer,
        cartslice:cartslice.reducer
    }
});
export default store;
