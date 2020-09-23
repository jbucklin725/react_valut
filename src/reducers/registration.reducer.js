const initialState = {
    username: undefined,
    password: undefined,
    email: undefined,
    qrData: undefined
}

export const registrationReducer = (state=initialState, action)=>{
    switch(action.type){
        case('SET_USERNAME'):{
            return {...state, username: action.payload}
        }
        case('SET_PASSWORD'):{
            return {...state, password: action.payload}
        }
        case('SET_EMAIL'):{
            return {...state, email: action.payload}
        }
        case('RELEASE_ALL'):{
            return {username: undefined, password: undefined, email: undefined}
        }
        case('SET_QR_DATA'):{
            return {...state, qrData: action.payload}
        }
        case('SET_SELECTED_VAULT'): {
            return {...state, vaultData: action.payload}
        }
        case('LOGOUT_SESSION'): {
            return {state, vaultData: undefined}
        }
        case('SET_SHARED_VAULT_DETAILS'): {
            return {...state, sharedVaultDetails: action.payload}
        }
        default: return state
    }
}