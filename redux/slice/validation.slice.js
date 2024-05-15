import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: 'success',
    msg: 'Shubham Housing Development Finance Company Limited'
}

const validationSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.type = 'error'
            state.msg = action.payload
        },
        setSuccess: (state, action) => {
            state.type = 'success'
            state.msg = action.payload
        },
        resetValidation: (state) => {
            state.type = ""
            state.msg = ""
        },
    },
})

export const { setError, setSuccess, resetValidation } = validationSlice.actions
export default validationSlice.reducer