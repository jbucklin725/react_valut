import React from 'react';
import {
	NavItem,
	Navbar,
	NavbarBrand,
	Collapse,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Container,
	Col,
	Row
} from 'reactstrap';

import profilephoto from '../../assets/images/users/2.jpg';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.showMobilemenu = this.showMobilemenu.bind(this);
		this.getCurrentWidgetName = this.getCurrentWidgetName.bind(this);
		this.state = {
			isOpen: false
		};
	}
	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	/**
	 * Get current Widget name
	 */
	getCurrentWidgetName() {
		const widgetName = this.props.routes.filter(prop => prop.path === this.props.location.pathname)
		if(widgetName.length > 0 && widgetName[0].name === 'Overview') {
			return 'Summarized Position'
		} else {
			return widgetName.length > 0 ? widgetName[0].name : 'Summarized Position'
		}
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar');
	}

	render() {
		
		const userDeatils = this.props.client_manager.auth.getUserDetails();

		return (
			<header className="topbar navbarbg" data-navbarbg="skin1">
				<Navbar className="top-navbar" dark expand="md">
					<div className="navbar-header" id="logobg" data-logobg="skin6">
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand>
							<b className="logo-icon">
							</b>
							<span className="logo-text1">

								<label>VAULT</label>
							</span>
							<span className="logo-text2">
								<label>v1.3</label>
							</span>
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<a className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
							<i className="ti-menu ti-close" />
						</a>
					</div>

					<Collapse className="navbarbg" isOpen={this.state.isOpen} navbar data-navbarbg="skin1" style={{ marginLeft: '150px', }}>
						
					</Collapse>
				</Navbar>

				<div className="sub-header col-md-11 ml-auto ">
					{/* <div className="col-md-12"> */}
					<Container fluid xl={12}>
					<Row  className="overview">
							<Col lg={3} md={2}  >
							<NavItem className="">
								<label href="" className="label mr-2 over" style={{ marginTop: '15px', fontSize: '2.4vh', color: '#fff', width: '100%' }}>{this.getCurrentWidgetName()}</label>
							</NavItem>
							</Col>
							<Col lg={6} md={7} >
							<Row className="top-hed d-flex justify-content-center">
							<NavItem className="">
								<span className="label mr-2 select-vault-lbl"><i className="mdi mdi-lock-outline" aria-hidden="true"></i>Selected Vault:</span>
							</NavItem>
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Profile Dropdown                                                         */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar >
								<DropdownToggle nav caret className="pro-pic">
									<span className="label mr-2 hydro-vault-lbl button-round-effect border-green p-10">{(userDeatils.user_vault_name !== 'undefined') && userDeatils.user_vault_name ? `${userDeatils.user_vault_name}` : `${this.props.currentVaultType.toUpperCase()} Vaults`} </span>
								</DropdownToggle>

							</UncontrolledDropdown>
							</Row>
							</Col>
							<Col  lg={3} md={3}  className="title-right" style={{ paddingTop: '0' }} >
								{/* <div className="active-user-pic ">className="pro-pic" */}

								<UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="pro-pic setting">
                                    {/* <img
                                        src={profilephoto}
                                        alt="user"
                                        className="rounded-circle"
                                        width="31"
                                    /> */}
									<div class="tooltip-se"><i class="mdi mdi-settings" onClick={this.props.showConfigScreen}></i>
									<span class="tooltiptext-valt">Vault Settings</span>
									</div>
                                </DropdownToggle>
                                {/* <DropdownMenu right className="user-dd layout-setting">
                                    <DropdownItem>
                                        <i className="ti-user mr-1 ml-1" /> My Account
                  </DropdownItem>
                                    <DropdownItem>
                                        <i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
                                    <DropdownItem>
                                        <i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/logout">
                                        <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <Button
                                        color="success"
                                        className="btn-rounded ml-3 mb-2 mt-2"
                                    >
                                        View Profile
                  </Button>
                                </DropdownMenu> */}
                            </UncontrolledDropdown>
                            {/*--------------------------------------------------------------------------------*/}
                            {/* End Profile Dropdown                                                           */}
                            {/*--------------------------------------------------------------------------------*/}

<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret className="pro-pic bell-notification">
									{/* <img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/> */}
									<i className="mdi mdi-bell"></i>
								</DropdownToggle>
								{/* <div class="noti-top"><i className="mdi mdi-triangle"></i></div> */}
								<DropdownMenu right className="user-dd notification">
								<DropdownItem className="new-message">
									<h4>12 New</h4>
									<p>User Notification</p>
								</DropdownItem>

								{/* <DropdownItem className="tabs-row tab-text-align">
									<Row className="tab-row-border-top">
										<Col className="tabs-col tab-text-align">Messages</Col><hr/>
										<Col className="tabs-col tab-text-align">Feeds</Col><hr/>
										<Col className="tab-text-align">Events</Col>
									</Row>
								</DropdownItem> */}
							
									<DropdownItem>
									<a><img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/><i class="mdi mdi-checkbox-blank-circle i-color"></i>
									<span><b>Oliver Kopyuv</b> hello again thanks</span></a>
                  </DropdownItem>
									<DropdownItem>
									<a><img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/><i class="mdi mdi-checkbox-blank-circle i-color not-active"></i>
									<span><b>John Kopyuv</b> hello again thanks</span></a>
                  </DropdownItem>
									<DropdownItem>
									<a><img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/><i class="mdi mdi-checkbox-blank-circle i-color"></i>
									<span><b>Oliver Kopyuv</b> hello again thanks</span></a>
                  </DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
									<a><img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/><i class="mdi mdi-checkbox-blank-circle i-color"></i>
									<span><b>John  Kopyuv</b> hello again thanks</span></a>
                  </DropdownItem>
									<DropdownItem divider />
									<DropdownItem href="/pages/login">
									<a><img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/><i class="mdi mdi-checkbox-blank-circle i-color"></i>
									<span><b>Oliver Kopyuv</b> hello again thanks</span></a>
                  </DropdownItem>
									<DropdownItem divider />
									<a class="view-all">View all notification</a>
								</DropdownMenu>
							</UncontrolledDropdown>
<li class="dropdown nav-item user">
<UncontrolledDropdown nav inNavbar>
	<DropdownToggle nav caret >
								<div className="active-user-pic">
									<img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/>
								</div>
								<div className="active-user-initial">
									<label>{this.props.first_name} {this.props.last_name}</label>
								</div>
								<div className="active-user-id">
									<label>ID:{this.props.userID}</label>
								</div>
								<div className="active-user-status">
									<i className="mdi mdi-checkbox-blank-circle i-color"></i> <label>Connected</label>
								</div>
								</DropdownToggle>
								<DropdownMenu right className="user-dd layout-setting user-right">
                                    <DropdownItem href="/logout">
                                        <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                                </DropdownMenu>
								</UncontrolledDropdown>
								</li>
							</Col>
						</Row>
						{/* <Row>
							<Col xl={10} lg={10} md={10} sm={7}><div className="welcome-title">
								<label>Hello {this.props.first_name}!</label>
							</div>
								<div className="welcome-subtitle">
									<label>Welcome to your Vault overview</label>
								</div></Col>

							<Col xl={2} lg={2} md={2} sm={5}  className="title-right" style={{ paddingTop: '30px' }} >
								{/* <div className="active-user-pic ">className="pro-pic" */}
								{/* <div className="active-user-pic">
									<img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/>
								</div>
								<div className="active-user-initial">
									<label>{this.props.first_name} {this.props.last_name}</label>
								</div>
								<div className="active-user-id">
									<label>ID:{this.props.userID}</label>
								</div>
								<div className="active-user-status">
									<i className="mdi mdi-checkbox-blank-circle i-color"></i> <label>Connected</label>
								</div>
							</Col>
						</Row> */} 

					</Container>
					{/* </div>  */}
				</div>

			</header>
		);
	}
}
export default Header;