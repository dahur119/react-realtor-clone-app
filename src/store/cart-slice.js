import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0

}

const cartSlice =  createSlice({
    name: "cart",
    initialState, 
    reducers :{
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item=>item.id === newItem.id)
            state.totalQuantity++;
            if (!existingItem){
                state.items.push({
                     id: newItem.id,
                      price: newItem.price,
                       quantity:1,
                        totalPrice: newItem.price, 
                        name:newItem.title
                })
            }else{
                existingItem.quantity ++;
                existingItem.totalPrice = existingItem.totalPrice +  newItem.price;
            }

        },
        removeItemCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item=>item.id === id)
            state.totalQuantity --;
            if(existingItem.quantity === 1){
                state.items.filter(item=> item.id !== item.id)
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price


            }
        }
 
    }
});

export const cartAction = cartSlice.actions

export default cartSlice.reducer