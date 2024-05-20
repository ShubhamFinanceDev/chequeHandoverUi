import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bankList: [],
    userDetails: { applicationDetails: [] }
}


const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setBankList: (state, action) => {
            state.bankList = action.payload
        },
        setApplicationDetails: (state, action) => {
            state.userDetails = action.payload
        }
    },
})

export const { setBankList, setApplicationDetails } = globalSlice.actions
export default globalSlice.reducer