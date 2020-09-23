import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'

class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.expandLogo = this.expandLogo.bind(this);
		this.activeRoute.bind(this);
	}

	expandLogo() {
		document.getElementById("logobg").classList.toggle("expand-logo");
	}
	
	activeRoute(routeName) { 
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'selected' : ''; 
	}

	render() {
		 
		 var routes = this.props.routes;
		 const props = this.props;
		 if(routes.length > 0) {
			routes = routes.filter((thread)=>{
				 if(thread.name !== 'sharedVault' && thread.name !== 'sharedVaultStatus' && thread.name !== 'withdrawSharedVault') {
					 return thread
				 } else {
					 return null
				 }
			})
		 }

		 return (
			<aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={this.expandLogo} onMouseLeave={this.expandLogo}>
				<div className="scroll-sidebar">
					<PerfectScrollbar className="sidebar-nav">
						
						<Nav id="sidebarnav">
							{routes.map((prop, key) => {
								if (prop.redirect) {
									return null;
								}
								else {
									return (
										
										<div key={key}>
											<li className= {this.activeRoute(prop.path) + (prop.pro ? ' active active-pro' : '') + ' sidebar-item'} key={key}>
											<NavLink to={prop.path} className="sidebar-link" key={key} activeClassName="active" onClick={() => prop.name === 'Overview' ? props.onSideBarChanged(prop.name) : ''}>
											<div className="li-name-div">
											<i className={prop.icon} />
											</div>
												<div className="li-name-div">
												<span className="hide-menu link-name">{prop.name}</span>
												</div>
											<div style={{minHeight: '50px'}}></div>
											</NavLink>
										</li></div>
									);
								}
							})}
						</Nav>
					</PerfectScrollbar>
				</div>
			</aside>
		);
	}
}
export default Sidebar;