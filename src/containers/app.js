
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { ClientManager } from "../client_support";
import { configureStore } from "../store/redux.store";
import { RegisterContainer } from "./register/RegisterContainer";
import { DashboardContainer } from "./dashboard/DashboardContainer";
import { LogInContainer } from "./LogInContainer";
import { CoSignerVerificationVaultContainer } from "./CoSignerVerificationVaultContainer";
import { CoSignerVerificationWithdrawContainer } from "./CoSignerVerificationWithdrawContainer";
import { ForgotPasswordContainer } from "./ForgotPasswordContainer";
import { ConfirmUserContainer } from "./register/UserConfirmContainer";
import { VerifyUserContainer } from "./register/UserVerifyContainer";
import { GoogleAuthContainer } from "./GoogleAuthContainer";
import { LogoutContainer } from "./register/LogoutContainer";
import { HydroAuthSignInContainer } from "./HydroAuthSignInContainer";
import { ResendVerificationContainer } from "./ResendVerificationEmailContainer";
import { ResetPasswordContainer } from "./ResetPasswordContainer";
import { TwoOptions2FAContainer } from "./TwoOptions2FAContainer";
import { VaultSummaryContainer } from "./VaultSummaryContainer";
// import { VaultConfigContainer } from "../VaultConfigContainer";

import { toast, Slide } from "react-toastify";

toast.configure({
  transition: Slide,
  position: "top-center",
  autoClose: 3000
});

export default class App extends React.Component {

  render() {
    const client_manager = ClientManager();
    const redux_store = configureStore();

    return (
      <Router>
        <Provider store={redux_store}>
          <div className="l-main">
            <Route exact path="/" render={() => <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/register" render={() => client_manager.auth.isLoggedIn() ?
              <RegisterContainer client_manager={client_manager} isAuthenticated={client_manager.auth.isLoggedIn()} /> :
              <RegisterContainer client_manager={client_manager} />} />

            <Route exact path="/dashboard" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager}  {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/settings" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/receive" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/send" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />

            <Route exact path="/sharedVault" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/signerSummary" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/SharedVaultStatus" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/withdrawSharedVault" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />

            <Route exact path="/login" render={() => <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/co-signer-verification" render={() => <CoSignerVerificationVaultContainer client_manager={client_manager} />} />
            <Route exact path="/confirmUser/:id" render={() => <ConfirmUserContainer client_manager={client_manager} />} />
            <Route exact path="/verifyUser" render={() => <VerifyUserContainer client_manager={client_manager} />} />
            <Route exact path="/auth" render={() => <GoogleAuthContainer client_manager={client_manager} {...this.props} />} />
            <Route exact path="/logout" render={() => <LogoutContainer client_manager={client_manager} {...this.props} />} />
            <Route exact path="/raindrop_2fa" render={() => <HydroAuthSignInContainer client_manager={client_manager} {...this.props} />} />
            <Route exact path="/forgot_password" render={() => <ForgotPasswordContainer client_manager={client_manager} />} />
            <Route exact path="/resend_email-verification" render={() => <ResendVerificationContainer client_manager={client_manager} />} />
            <Route exact path="/reset_password/:token" render={() => <ResetPasswordContainer client_manager={client_manager} />} />
            <Route exact path="/options_2fa" render={() => <TwoOptions2FAContainer client_manager={client_manager} />} />

            <Route exact path="/addnewVault" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/coSignerTxnVerification" render={() => client_manager.auth.isLoggedIn() ? <CoSignerVerificationWithdrawContainer client_manager={client_manager} {...this.props} /> : <LogInContainer client_manager={client_manager} />} />

            <Route exact path="/singleVaultSummary" render={() => client_manager.auth.isLoggedIn() ? <VaultSummaryContainer client_manager={client_manager} /> : <LogInContainer client_manager={client_manager} />} />
            <Route exact path="/allVaults" render={() => client_manager.auth.isLoggedIn() ? <DashboardContainer client_manager={client_manager} /> : <LogInContainer client_manager={client_manager} />} />
            {/* <Route exact path="/allVaults" render={() => <DashboardContainer client_manager={client_manager} />} /> */}

          </div>

        </Provider>
      </Router>
    )
  }
}