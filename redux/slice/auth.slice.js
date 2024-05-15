import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    token: "",
    isAdmin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserAuthCred: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
})

export const { setUserAuthCred } = authSlice.actions
export default authSlice.reducer