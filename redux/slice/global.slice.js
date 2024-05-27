import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    branchList: [],
    applications: [],
    applicationMeta: {},
    assingBranch: [],
    userDetails: []

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
        setBranchList: (state, action) => {
            state.branchList = action.payload
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
        setAssingBranch: (state, action) => {
            state.assingBranch = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        },

    },
})

export const { setBranchList, setApplicationDetails, updateApplicationStatus, resetGlobalState, setAssingBranch, setUserDetails } = globalSlice.actions
export default globalSlice.reducer