export const set_username = (username)=>({
    type: 'SET_USERNAME',
    payload: username
})

export const set_password = (password)=>({
    type: 'SET_PASSWORD',
    payload: password
})

export const set_email = (email)=>({
    type: 'SET_EMAIL',
    payload: email
})

export const release_all = ()=>({
    type: 'RELEASE_ALL'
})

export const set_qr_data = (qrData)=>({
    type: 'SET_QR_DATA',
    payload: qrData
})

export const set_selected_vault = (vaultData)=>({
    type: 'SET_SELECTED_VAULT',
    payload: vaultData
})

export const set_logout_session = ()=>({
    type: 'LOGOUT_SESSION',
    payload: {}
})

export const set_shared_vault_details = (sharedVaultDetails) => ({
    type: 'SET_SHARED_VAULT_DETAILS',
    payload: sharedVaultDetails
})
