import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from './ui-slice';
import cartReducer from './cart-slice'


const store = configureStore ({
    reducer:{ui:uiSliceReducer, cart:cartReducer}
});
export default store