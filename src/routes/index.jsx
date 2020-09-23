import Fulllayout from '../components/layouts/fulllayout';
import RegisterComponent from '../components/RegisterComponent/RegisterComponent';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import NotFoundComponent from '../components/NotFoundComponent/NotFoundComponent';
import Authentication from '../components/authentication-component/google-auth/GoogleAuth'
import HydroAuthentication from '../components/authentication-component/hydro-auth-signin/HydroAuthSignIn'
import AddNewVault from '../components/add-vault-component/AddVaultComponent';
import SingleVaultSummary from '../components/singleVaultSummary/VaultSummaryComponent';
import VaultConfigComponent from '../components/vault-config/VaultConfigComponent';
import AllVaultsComponent from '../components/accounts-component/AccountsComponent';
import SharedVaultComponent from '../components/sharedVaultComponent/SharedVaultComponentFile';
import signerSummaryComponent from '../components/signerSummaryComponent/SignerSummaryComponent';
import SharedVautStatusComponent from '../components/shared-vault-status-component/SharedVaultStatus';

var indexRoutes = [
    { path: '/dashboard', name: 'Dashboard', component: Fulllayout },
    { path: '/receive', name: 'Receive', component: Fulllayout },
    { path: '/send', name: 'Send', component: Fulllayout },
    { path: '/settings', name: 'Settings', component: Fulllayout },
    { path: '/logout', name: 'Logout', component: Fulllayout },
    { path: '/', name: 'Register', component: RegisterComponent },
    { path: '/', name: 'Login', component: LoginComponent },
    { path: '/', name: 'Auth', component: Authentication },
    { path: '/', name: 'AuthSignIn', component: HydroAuthentication },
    { path: '/', name: 'AddNewVault', component: AddNewVault },
    { path: '/', name: 'SingleVaultSummary', component: SingleVaultSummary },
    { path: '/', name: 'VaultConfig', component: VaultConfigComponent },
    { path: '/sharedVault', name: 'sharedVault', component: SharedVaultComponent },
    { path: '/', name: 'signerSummary', component: signerSummaryComponent },
    { path: '/', name: 'sharedVautStatus', component: SharedVautStatusComponent },
    { path: '/allVaults', name: 'All Vaults', component: AllVaultsComponent },
    { path: '/notfound', name: 'NotFoundComponent', component: NotFoundComponent }
];

export default indexRoutes;
