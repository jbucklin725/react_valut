import {combineReducers} from 'redux'
import {account_reducer} from './account.reducer'
import {registrationReducer} from './registration.reducer'
export const allReducers = combineReducers({
    account: account_reducer,
    registration: registrationReducer
})