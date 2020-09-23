
export const Authenticator = {

	saveToken: (token) => {

		return localStorage.setItem("access_token", token);

	},

	saveUserProfile: (userProfile) => {
		return {
			localStorageProfile: localStorage.setItem("user_email", userProfile.email),
		}

	},

	saveUserPreVault: (vault) => {
		return {
			localStorageVaults: localStorage.setItem("user_vaults", vault._id)
		}
	},

	saveUserSelectedVault: (vault) => {
		return {
			localStorageVaults: {
				address: localStorage.setItem("user_vault_address", vault.address),
				id: localStorage.setItem("user_vault_id", vault._id),
				name: localStorage.setItem("user_vault_name", vault.name),
				currency: localStorage.setItem("user_vault_currency", vault.currency),
				vaultType: localStorage.setItem("vault_type", vault.type)
			}
		}
	},

	setEmptyUserVault: () => {
		return {
			localStorageVaults: {
				address: localStorage.setItem("user_vault_address", undefined),
				id: localStorage.setItem("user_vault_id", undefined),
				name: localStorage.setItem("user_vault_name", undefined),
				currency: localStorage.setItem("user_vault_currency", undefined),
				vaultType: localStorage.setItem("vault_type", undefined)
			}
		}
	},

	getToken: () => {

		return localStorage.getItem("access_token");

	},

	isLoggedIn: () => {

		if (localStorage.getItem("access_token") === null) {

			return false;

		} else {

			return true;
		}
	},

	isLogout: () => {
		
		localStorage.removeItem("access_token");
		localStorage.removeItem("id_token");
		localStorage.removeItem("expires_at");
		localStorage.clear();
	},

	getHeader: () => {
		return {
			"Authorization": "bearer " + localStorage.getItem("access_token")
		}
	},

	getUserDetails: () => {

		return {
			user_email: localStorage.getItem("user_email"),
			user_pre_vaultID: localStorage.getItem("user_vaults"),

			user_vault_address: localStorage.getItem("user_vault_address"),
			user_vault_id: localStorage.getItem("user_vault_id"),
			user_vault_name: localStorage.getItem("user_vault_name"),
			user_vault_currency: localStorage.getItem("user_vault_currency"),
			vault_type: localStorage.getItem("vault_type")
		}
	}
}
