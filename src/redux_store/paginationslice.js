import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 1,
    arr:[]
};

export const counterSlicer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.counter = state.counter + action.payload;
        },
        decrement: (state, action) => {
            state.counter = state.counter - action.payload;
        },
        array:(state,action)=>{
            state.arr=action.payload;
        }
    },
});

// Exporting actions
export const { increment, decrement, array } = counterSlicer.actions;

// Exporting reducer
export default counterSlicer.reducer;
