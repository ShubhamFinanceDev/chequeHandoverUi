import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bankList: []
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setBankList: (state, action) => {
            state.bankList = action.payload
        },

    },
})

export const { setBankList } = globalSlice.actions
export default globalSlice.reducer