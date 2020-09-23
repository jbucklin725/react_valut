module.exports = {
    isPathAllowed : (props, path) => {
        if(props.match.path === path) {
            return true
        } else {
            return false
        }
    },

    isSingleAllowed : (props, userDeatils) => {
        if ((props.vaultData && props.vaultData.user_vault_id) || (userDeatils && ((userDeatils.user_vault_address !== "undefined") && (userDeatils.user_vault_id !== null)))) {
            return true
        } else {
            return false
        }
    },

    isVaultShared: (props, userDeatils) => {
        if ((props.vaultData && props.vaultData.type === 'shared') || (userDeatils.vault_type !== null && userDeatils.vault_type === 'shared')) {
            return true
        } else {
            return false
        }
    },

    isDataConsistant: (props, userDeatils) => {
        /**
         * Check is props and userDetails data is equail or not
         */
        if(props.vaultData && props.vaultData._id !== undefined) {
            if(props.vaultData._id === userDeatils.user_vault_id) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

}