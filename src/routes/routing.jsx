import DashboardComponent from '../views/Dashboard/dashboard.jsx';
import DepositeModalPopup from '../components/modalPopup/DepositeModalUI.jsx';
import WithdrawModalPopup from '../components/modalPopup/WithdrawModalUI.jsx';
import AddVaultComponent from '../components/add-vault-component/AddVaultComponent.jsx';
import AllVaultsComponent from '../components/all-vaults-component/AllVaultsComponent.jsx';
import Logout from '../views/LogoutUI/LogoutUI';
import SharedVaultComponent from '../components/sharedVaultComponent/SharedVaultComponentFile';
import SharedVautStatusComponent from '../components/shared-vault-status-component/SharedVaultStatus.jsx';
import WithdrawSVSummaryComponent from '../components/withdraw-sv-summary-component/WithdrawSVSummaryComponent';

var AllRoutes = [
  { 
    path: '/dashboard', 
    name: 'Overview', 
    icon: 'mdi mdi-view-dashboard', 
    component: DashboardComponent 
  },
  {
    path: '/send',
    name: 'Withdraw',
    icon: 'mdi mdi-arrow-up',
    component: WithdrawModalPopup
  },
  {
    path: '/receive',
    name: 'Deposit',
    icon: 'mdi mdi-arrow-down',
    component: DepositeModalPopup
  },
  {
    path: '/allVaults',
    name: 'Vaults',
    icon: 'mdi mdi-account-multiple',
    component: AllVaultsComponent
  },
  {
    path: '/addNewVault',
    name: 'Add New Vault',
    icon: 'mdi mdi-account-plus',
    component: AddVaultComponent
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: 'mdi mdi-power',
    component: Logout,
    noHeaderAndFooter: true
  },
  {
    path: '/SharedVaultStatus',
    name: 'sharedVaultStatus',
    component: SharedVautStatusComponent
  },

  {
    path: '/sharedVault',
    name: 'sharedVault',
    component: SharedVaultComponent
  },

  {
    path: '/withdrawSharedVault',
    name: 'withdrawSharedVault',
    component: WithdrawSVSummaryComponent
  }
];
export default AllRoutes;