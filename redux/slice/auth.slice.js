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
        removeUserAuthCred: (state, action) => {
            return {
                ...state,
                ...initialState
            };
        },
        restoreAuthState: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
})

export const { setUserAuthCred, removeUserAuthCred, restoreAuthState } = authSlice.actions
export default authSlice.reducer