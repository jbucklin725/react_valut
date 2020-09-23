import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import Footer from '../footer/footer.jsx';
import AllRoutes from '../../routes/routing.jsx';
import DashboardComponent from '../../views/Dashboard/dashboard.jsx';
import  AllVaultsComponent  from '../all-vaults-component/AllVaultsComponent.jsx';
import DepositeModalPopup from '../modalPopup/DepositeModalUI.jsx';
import WithdrawModalPopup from '../modalPopup/WithdrawModalUI.jsx';

import SharedVault from '../sharedVaultComponent/SharedVaultComponentFile';
import SharedVaultStatus from '../shared-vault-status-component/SharedVaultStatus';
import WithdrawSVSummaryComponent from '../withdraw-sv-summary-component/WithdrawSVSummaryComponent';

import AddVaultComponent from '../add-vault-component/AddVaultComponent';
import { VaultConfigContainer } from "../../containers/VaultConfigContainer";

class Fulllayout extends React.Component {
	/*--------------------------------------------------------------------------------*/
	/*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
	/*--------------------------------------------------------------------------------*/
	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.state = {
			isOpen: false,
			width: window.innerWidth
		};

		this.props.history.listen((location, action) => {
			if (window.innerWidth < 767 &&
				document.getElementById('main-wrapper').className.indexOf("show-sidebar") !== -1) {
				document.getElementById('main-wrapper').classList.toggle("show-sidebar");
			}
		});
	}
	/*--------------------------------------------------------------------------------*/
	/*Life Cycle Hook, Applies when loading or resizing App                           */
	/*--------------------------------------------------------------------------------*/
	componentDidMount() {
		window.addEventListener("load", this.updateDimensions);
		window.addEventListener("resize", this.updateDimensions);
	}
	/*--------------------------------------------------------------------------------*/
	/*Function that handles sidebar, changes when resizing App                        */
	/*--------------------------------------------------------------------------------*/
	updateDimensions() {
		let element = document.getElementById('main-wrapper');
		this.setState({
			width: window.innerWidth
		});
		if (this.state.width < 1170) {
			element.setAttribute("data-sidebartype", "mini-sidebar");
			element.classList.add("mini-sidebar");
		} else {
			element.setAttribute("data-sidebartype", "full");
			element.classList.remove("mini-sidebar");
		}
	}
	/*--------------------------------------------------------------------------------*/
	/*Life Cycle Hook                                                                 */
	/*--------------------------------------------------------------------------------*/
	componentWillUnmount() {
		window.removeEventListener("load", this.updateDimensions);
		window.removeEventListener("resize", this.updateDimensions);
	}


	render() {
		/*--------------------------------------------------------------------------------*/
		/* Theme Setting && Layout Options wiil be Change From Here                       */
		/*--------------------------------------------------------------------------------*/
		return (
			<div
				id="main-wrapper"
				data-theme="light"
				data-layout="vertical"
				data-sidebartype="full"
				data-sidebar-position="fixed"
				data-header-position="fixed"
				data-boxed-layout="full"
			>
				{/*--------------------------------------------------------------------------------*/}
				{/* Header                                                                         */}
				{/*--------------------------------------------------------------------------------*/}
				<Header data={this.state} {...this.props} routes={AllRoutes}/>
				{/*--------------------------------------------------------------------------------*/}
				{/* Sidebar                                                                        */}
				{/*--------------------------------------------------------------------------------*/}
				<Sidebar data={this.state} {...this.props} routes={AllRoutes} />
				{/*--------------------------------------------------------------------------------*/}
				{/* Page Main-Content                                                              */}
				{/*--------------------------------------------------------------------------------*/}
				<div className="page-wrapper d-block">
					<div className="page-content container-fluid">
						<Switch>
							{AllRoutes.map((prop, idx) => {
								if (prop.redirect) {
									return <Redirect from={prop.path} to={prop.pathTo} key={idx} {...this.props}/>;
								}
								else {
									
									if(prop.path === '/dashboard') {
										return <Route key={idx} path={prop.path} render={(props) => <DashboardComponent {...this.props} />} />
									} else if(prop.path === '/allVaults') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <AllVaultsComponent {...this.props} />} />
										);
									} else if(prop.path === '/send') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <WithdrawModalPopup {...this.props} />} />
										);
									} else if(prop.path === '/receive') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <DepositeModalPopup {...this.props} />} />
										);
									} else if(prop.path === '/addNewVault') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <AddVaultComponent {...this.props} />} />
										);
									} else if(prop.path === '/settings') {
										console.log('Here-----')
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <VaultConfigContainer {...this.props} />} />
										);
									} else if (prop.path === '/sharedVault') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <SharedVault {...this.props} />} />
										);
								    } else if (prop.path === '/SharedVaultStatus') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <SharedVaultStatus {...this.props} />} />
										);
									} else if (prop.path === '/withdrawSharedVault') {
										return (
											<Route 
											key={idx}
											path={prop.path}
											render={(props) => <WithdrawSVSummaryComponent {...this.props} />} />
										);
									}
									else {
										return (
											<Route path={prop.path} component={prop.component} key={idx} {...this.props} />
										);
									}
								}
							})}
						</Switch>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}
export default Fulllayout;
