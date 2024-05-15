import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'
import authSlice from './slice/auth.slice'
import validationSlice from './slice/validation.slice'

const rootReducer = combineReducers({
    loaderSlice,
    authSlice,
    validationSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store