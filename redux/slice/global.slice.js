import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bankList: [],
    applications: [],
    applicationMeta: {}
}


const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        resetGlobalState: (state, action) => {
            return {
                ...state,
                ...initialState
            };
        },
        setBankList: (state, action) => {
            state.bankList = action.payload
        },
        setApplicationDetails: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        updateApplicationStatus: (state, action) => {
            state.applications = [
                ...state.applications.filter((d) => {
                    if (d.applicationNumber == action.payload) {
                        d.chequeStatus = 'Y'
                        return d
                    }
                    return d
                })]
        },
    },
})

export const { setBankList, setApplicationDetails, updateApplicationStatus, resetGlobalState } = globalSlice.actions
export default globalSlice.reducer