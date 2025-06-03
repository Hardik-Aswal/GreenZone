import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface Mode {
  value: "green" | "home"
}


const initialState: Mode = {
  value: "home",
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    change: (state) => {
      state.value = state.value === "home" ? "green" : "home"
    },
  },
})

export const { change } = modeSlice.actions

export const selectMode = (state: RootState) => state.mode.value

export default modeSlice.reducer