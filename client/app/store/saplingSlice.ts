import { createSlice } from "@reduxjs/toolkit";



interface Sapling{
    value : number;
}

const initialState : Sapling = {
    value: 3750,
}

export const saplingSlice = createSlice({
    name : 'sapling',
    initialState,
    reducers : {
        incrementByValue: (state  , action  ) => {
            state.value += action.payload;
        },
        decrementByValue: (state , action  ) => {
            state.value -= action.payload;
        },
        reset: (state ) => {
            state.value = 0;
        },
    }
})

export const { incrementByValue, decrementByValue, reset } = saplingSlice.actions;
export default saplingSlice.reducer;