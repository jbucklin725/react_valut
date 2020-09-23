import axios from "axios";
const domain = process.env.NODE_ENV === "development" ? "api-dev.hydrovault.io" : "api-dev.hydrovault.io";
const apiUrl = `http://${domain}`;

const Service = (method, url, data, headers, onSuccess, onError) => {

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    })
        .then(response => {

            if (method === 'POST' || method === 'GET') {

                return onSuccess(response.data);

            } else {

                if (method === 'PUT') {

                    if (response.status === 204) return onSuccess();
                    if (response.message !== undefined && response.status === 315) {
                        return onError(response.message);
                    }
                }
            }

        })
        .catch(err => {

            return onError(err);

        })
}

const BasicService = {

    get: (endpoint, headers, onSuccess, onError) => {
        const url = `${apiUrl}/${endpoint}`;

        return Service('GET', url, null, headers, onSuccess, onError);
    },
    post: (endpoint, data, headers = {}, onSuccess, onError) => {
        const url = `${apiUrl}/${endpoint}`;
        const completeHeaders = Object.assign({}, headers, { "Content-Type": "application/json" });

        return Service('POST', url, data, completeHeaders, onSuccess, onError);
    },
    put: (endpoint, data, headers = {}, onSuccess, onError) => {
        const url = `${apiUrl}/${endpoint}`;
        const completeHeaders = Object.assign({}, headers, { "Content-Type": "application/json" });

        return Service('PUT', url, data, completeHeaders, onSuccess, onError);
    }

}

export const NetworkService = function () {

    const state = {

        getUserInfo: function (headers, onSuccess, onError) {
            return BasicService.get("v1/account/profile", headers, onSuccess, onError);
        },

        getUserTFA: function (headers, onSuccess, onError) {
            return BasicService.get("v1/user/tfa_type", headers, onSuccess, onError);
        },

        changeUserInfo: function (headers, data, useremail, onSuccess, onError) {
            return BasicService.put(`api/updateUserProfile?user_email=${encodeURIComponent(useremail)}`, data, headers, onSuccess, onError);
        },

        login: function (form, onSuccess, onError) {
            return BasicService.post("v1/user/login", form, {}, onSuccess, onError);
        },

        register: function (form, onSuccess, onError) {
            return BasicService.post("v1/user/register", form, {}, onSuccess, onError);
        },

        forgot_password: function (form, onSuccess, onError) {
            return BasicService.post("v1/user/forgot_password", form, {}, onSuccess, onError);
        },

        reset_password: function (form, onSuccess, onError) {
            return BasicService.post("v1/user/reset_password", form, {}, onSuccess, onError);
        },

        // resend_verification_email
        resend_verification_email: function (form, onSuccess, onError) {
            return BasicService.post("v1/user/resend_token", form, {}, onSuccess, onError);
        },

        confirmUser: function (data, email, onSuccess, onError) {
            const body = {
                "verification_token": data,
                "email": email
            }
            return BasicService.post("v1/user/verify", body, {}, onSuccess, onError);
        },

        confirmGoogleAuthToken: function (headers, data, onSuccess, onError) {
            const body = {
                "token": data.token
            }
            return BasicService.post("v1/account/verify_token", body, headers, onSuccess, onError);
        },

        changePassword: function (form, onSuccess, onError) {
            return BasicService.post("auth/users?action=changePassword", form, {}, onSuccess, onError);
        },

        generateSecret: function (headers, onSuccess, onError) {
            return BasicService.get("v1/account/generate/secret", headers, onSuccess, onError);
        },
        /**
         * raindrop/register
         */
        raindropRegister: function (form, onSuccess, onError) {
            return BasicService.post("v1/account/raindrop/register", form, {}, onSuccess, onError);
        },
        /**
         * raindrop/get_message
         */
        raindropGetMessage: function (headers, onSuccess, onError) {
            return BasicService.get("v1/account/raindrop/get_message", headers, onSuccess, onError);
        },

        /**
         * Dashboard API's
         * 1. Get transaction history API for all vaults
         */
        getTransactionHistory: function (headers, vaultID, trasnactionHistoryFlag, onSuccess, onError) {
            return BasicService.get(`v1/vault/${encodeURIComponent(vaultID)}/history?action=${trasnactionHistoryFlag}&page=1&size=50`, headers, onSuccess, onError);
        },

        /**
         * 2. Get balance for all vaults
         */
        getBalanceAllVaults: function (headers, onSuccess, onError) {
            return BasicService.get(`v1/account/vaults`, headers, onSuccess, onError);
        },

        /**
         * getSingleVaultBalance
         */
        getSingleVaultBalance: function (headers, vaultID, symbol, onSuccess, onError) {
            return BasicService.get(`v1/vault/${vaultID}/balance?symbol=${symbol}`, headers, onSuccess, onError);
        },

        /**
         * Get All vaults txn history
         */
        getAllVaultsTxnsHistory: function (headers, onSuccess, onError) {
            return BasicService.get(`v1/vault/allHistory?action=all&page=1&size=50`, headers, onSuccess, onError);
        },
        /**
         * Get Single Graph Data
         */
        getSingleGraphData: function (headers, vaultID, filterType, onSuccess, onError) {
            return BasicService.get(`v1/vault/${encodeURIComponent(vaultID)}/graph?filter=${encodeURIComponent(filterType)}`, headers, onSuccess, onError);
        },
        /**
         * Get All graph data
         */
        getAllGraphData: function (headers, filterType, onSuccess, onError) {
            return BasicService.get(`v1/vault/graph?filter=${encodeURIComponent(filterType)}`, headers, onSuccess, onError);
        },
        /**
         * List all token
         */
        getTokenList : function (headers, onSuccess, onError) {
            return BasicService.get(`v1/user/listTokens`, headers, onSuccess, onError);
        },

        /**
         * Create New Vault
         */
        createNewVault: function (header, form, onSuccess, onError) {
            return BasicService.post("v1/vault/new", form, header, onSuccess, onError);
        },

        /**
         * Withdraw API
         */
        withdrawCryptoAPI: function (header, form, vaultID, onSuccess, onError) {
            return BasicService.post(`v1/vault/${vaultID}/withdraw`, form, header, onSuccess, onError);
        }, 

        /**
         * Shared Vault API's
         */
        /**
         * create Shared valut API's
         */
        createSharedVault: function (header, form, onSuccess, onError) {
            return BasicService.post(`v1/vault/shared/create`, form, header, onSuccess, onError);
        }, 

        /**
         * Co Signer Verification Page shared vault
         */
        coSignerVerificationAPI: function (headers, data, onSuccess, onError) {
            return BasicService.post("v1/vault/shared/acceptInvitation", data, headers, onSuccess, onError);
        },

        /**
         * coSignerTxnsVerificationAPI withdraw txs API
         */
        coSignerTxnsVerificationAPI: function (headers, vaultID, data, onSuccess, onError) {

            return BasicService.post(`v1/vault/shared/${vaultID}/approveRequest`, data, headers, onSuccess, onError);
        },

        /**
         * Withdraw shared vault
         */
        sharedVaultWithdrawAPI: function (header, form, vaultID, onSuccess, onError) {
            return BasicService.post(`v1/vault/shared/${vaultID}/initiateRequest`, form, header, onSuccess, onError);
        },

        /**
         * Get Shared Vault Balance
         */
        getSharedSingleVaultBalance: function (headers, vaultID, symbol, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/${vaultID}/balance?symbol=${symbol}`, headers, onSuccess, onError);
        },

        /**
         * getSharedAllVaultBalance
         */
        getSharedAllVaultBalance: function (headers, onSuccess, onError) {
            return BasicService.get(`v1/account/sharedVaults`, headers, onSuccess, onError);
        },

        /**
         * Shared Vualt Txns History
         */
        getSharedSingleVaultTxns: function (headers, vaultID, trasnactionHistoryFlag, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/${encodeURIComponent(vaultID)}/history?action=${trasnactionHistoryFlag}&page=1&size=50`, headers, onSuccess, onError);
        },

        /**
         * Get Shared Vault
         */
        getSingleSharedGraphData: function (headers, vaultID, filterType, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/${encodeURIComponent(vaultID)}/graph?filter=${encodeURIComponent(filterType)}`, headers, onSuccess, onError);
        },

        /**
         * Get All graph shared data
         */
        getSharedAllGraphData: function (headers, filterType, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/allgraph?filter=${encodeURIComponent(filterType)}`, headers, onSuccess, onError);
        },

        /**
         * Get ALl shared Vault Txns History
         */
        getSharedAllVaultTxns: function (headers, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/allHistory?action=all&page=1&size=50`, headers, onSuccess, onError);
        },

        /**
         * Get Shared Vault signers
         */
        getSignersSharedVaultData: function (headers, vaultID, onSuccess, onError) {
            return BasicService.get(`v1/vault/shared/${encodeURIComponent(vaultID)}/signers`, headers, onSuccess, onError);
        },

        /**
         * Get Total balance for all vaults
         */
        getAllVaultsBalance: function (headers, onSuccess, onError) {
            return BasicService.get(`v1/account/totalBalance`, headers, onSuccess, onError);
        },

    }
    return Object.assign({}, state)
}