import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'
import authSlice from './slice/auth.slice'
import validationSlice from './slice/validation.slice'
import globalSlice from './slice/global.slice'

const rootReducer = combineReducers({
    loaderSlice,
    authSlice,
    validationSlice,
    globalSlice
})

const store = configureStore({
    reducer: rootReducer,
    devTools: false,
})

export default store