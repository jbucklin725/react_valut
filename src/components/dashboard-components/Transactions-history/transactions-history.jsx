import React from "react";

import {
	Card,
	CardBody,
	CardTitle,
	Button,
	Container,
	Col,
	Row

} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import Moment from 'react-moment';
import DatePicker from "react-date-picker";
import IosSearch from 'react-ionicons/lib/IosSearch'

const RowData = (props) => {
	const { transaction } = props;
	return (
		<div>
			{
				transaction.transaction_type !== 'deposit' ?
					<Row className={transaction.transaction_hash ? "transactions-sub-container" : "transactions-sub-container disable"} >
						<Col xs={1}><div className="">
							{
								transaction.transaction_type !== 'deposit' ? <i className="mdi mdi-arrow-up-bold-circle-outline i-font i-sent"></i> :
									<i className="mdi mdi-arrow-down-bold-circle-outline i-font i-sent"></i>
							}
						</div></Col>
						<Col xs={2} className="pl-0"><div className="">
							<h5 className="mb-0 font-16 font-medium">Txn Date</h5><span className="color-dark-sm-font1">
								<Moment format="YYYY/MM/DD HH:MM:ss">
									{transaction.timestamp}
								</Moment>
							</span></div>
						</Col>
						<Col xs={2} className="pl-0">
							<div className="">
								<h5 className="mb-0 font-16 font-medium">Vault Name</h5>
								{
									transaction.vault ? 
									<div className="comp color-dark-sm-font1"><i className="mdi mdi-account"></i> {transaction.vault.name}</div> :
									<div className="comp color-dark-sm-font1"><i className="mdi mdi-account-multiple"></i>{transaction.sharedVault ? transaction.sharedVault.name : ''}</div>
								}
							</div>
						</Col>

						<Col xs={2}><div className="">
							<h5 className="mb-0 font-16 font-medium">Sent From:</h5><span className="color-dark-sm-font1">{transaction.from}</span></div></Col>
						<Col xs={2}><div className="">
							<h5 className="mb-0 font-16 font-medium">Sent To:</h5><span className="color-dark-sm-font1">{transaction.to}</span></div></Col>
						<Col xs={1}>
							<div className="view-search">
								<h5 className="mb-0 font-16 font-medium">View:</h5>
								{
									transaction.transaction_hash ? 
									<a href={'https://rinkeby.etherscan.io/tx/' + transaction.transaction_hash} target="_blank"><IosSearch  fontSize="18px" color="#ffffff" /> </a>
									: ''
								}
							</div>
						</Col>
						<Col xs={1} style={{ textAlign: 'right' }}><div className="">
							<h5 className="mb-0 font-16 font-medium">-{transaction.amount} <i className={`mdi ${getSymbol(transaction.token)} i-font1`}></i></h5><span className="color-dark-sm-font1"> {transaction.token}</span></div></Col>
						<Col xs={1} style={{ paddingTop: '10px', textAlign: 'right' }}>
							{
								<Button className="btn button-round-effect balance-interval-btn btn-year-for-demo" size="sm">{getTransactionStatusName(transaction.transaction_hash, transaction.status)}<i className={getTransactionLogo(transaction.transaction_hash, transaction.status)}></i></Button>
							}

						</Col>
					</Row>
					:

					<Row className={transaction.transaction_hash ? "transactions-sub-container" : "transactions-sub-container disable"} >
						<Col xs={1}><div className="">
							{
								transaction.transaction_type !== 'deposit' ? <i className="mdi mdi-arrow-up-bold-circle-outline i-font i-sent"></i> :
									<i className="mdi mdi-arrow-down-bold-circle-outline i-font i-sent"></i>
							}
						</div></Col>
						<Col xs={2} className="pl-0"><div className="">
							<h5 className="mb-0 font-16 font-medium">Txn Date</h5><span className="color-dark-sm-font1">
								<Moment format="YYYY/MM/DD HH:MM:ss">
									{transaction.timestamp}
								</Moment>
							</span></div>
						</Col>
						<Col xs={2} className="pl-0">
							<div className="">
								<h5 className="mb-0 font-16 font-medium">Vault Name</h5>
								{
									transaction.vault ? 
									<div className="comp color-dark-sm-font1"><i className="mdi mdi-account"></i> {transaction.vault.name}</div> :
									<div className="comp color-dark-sm-font1"><i className="mdi mdi-account-multiple"></i>{transaction.sharedVault ? transaction.sharedVault.name : ''}</div>
								}
							</div>
						</Col>

						<Col xs={2}><div className="">
							<h5 className="mb-0 font-16 font-medium">Received From:</h5><span className="color-dark-sm-font1">{transaction.from}</span></div></Col>
						<Col xs={2}><div className="">
							<h5 className="mb-0 font-16 font-medium">Received To:</h5><span className="color-dark-sm-font1">{transaction.to}</span></div></Col>
						<Col xs={1}>
							<div className="view-search">
								<h5 className="mb-0 font-16 font-medium">View:</h5>
								{
									transaction.transaction_hash ? 
									<a href={'https://rinkeby.etherscan.io/tx/' + transaction.transaction_hash} target="_blank"><IosSearch  fontSize="18px" color="#ffffff" /> </a>
									: ''
								}
								
							</div>
						</Col>
						<Col xs={1} style={{ textAlign: 'right' }}><div className="">
							<h5 className="mb-0 font-16 font-medium">{transaction.amount} <i className={`mdi ${getSymbol(transaction.token)} i-font1`}></i></h5><span className="color-dark-sm-font1"> {transaction.token}</span></div></Col>

						<Col xs={1} style={{ paddingTop: '10px', textAlign: 'right' }}>
							{
								<Button className="btn button-round-effect balance-interval-btn btn-year-for-demo" size="sm">{getTransactionStatusName(transaction.transaction_hash, transaction.status)}<i className={getTransactionLogo(transaction.transaction_hash, transaction.status)}></i></Button>
							}
						</Col>
					</Row>
			}
			<div className="span-common-height"></div>
		</div>
	)
}

const getTransactionStatusName = (hash, status) => {
	switch(status) {
		case ('completed') : {
			if(hash) {
				return 'Completed'
			} else {
				return 'Not Started'
			}
		}

		case ('pending') : {
			if(hash) {
				return 'Pending'
			} else {
				return 'Not Started'
			}
		}

		default: {
            return status
        }
	}
}

const getTransactionLogo = (hash, status) => {
	switch(status) {
		case ('completed') : {
			if(hash) {
				return 'mdi mdi-check'
			} else {
				return 'mdi mdi-reload'
			}
		}

		case ('pending') : {
			if(hash) {
				return 'mdi mdi-reload'
			} else {
				return ''
			}
		}

		default: {
            return status
        }
	}
}

const getSymbol = (iconName) => {
	if (iconName === 'eth') {
		return 'mdi-currency-eth'
	} else {
		return 'mdi-water';
	}
}

class Transactions extends React.Component {
	constructor(props) {
		super(props);

		this.toggle10 = this.toggle10.bind(this);
		this.toggle20 = this.toggle20.bind(this);
		this.toggle30 = this.toggle30.bind(this);
		this.toggle40 = this.toggle40.bind(this);
		this.state = {
			tooltipOpen10: false,
			tooltipOpen20: false,
			tooltipOpen30: false,
			tooltipOpen40: false
		};
	}

	toggle10() {
		this.setState({
			tooltipOpen10: !this.state.tooltipOpen10
		});
	}

	toggle20() {
		this.setState({
			tooltipOpen20: !this.state.tooltipOpen20
		});
	}

	toggle30() {
		this.setState({
			tooltipOpen30: !this.state.tooltipOpen30
		});
	}

	toggle40() {
		this.setState({
			tooltipOpen40: !this.state.tooltipOpen40
		});
	}

	render() {

		const {
			filterTrasnactionHistory, isTxnsLoading, trasnactionHistoryFlag
		} = this.props;

		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Dashboard-4 [General]                                                  */
			/*--------------------------------------------------------------------------------*/

			<Card>
				<CardBody>
					<div className="d-flex align-items-center mb-3">
						<div className="border-0 p-0 text-info list-inline-item">
							<CardTitle>Transactions
							<Button className="btn button-round-effect balance-interval-btn btn-year-for-demo" size="sm" style={{ marginLeft: '20px' }}>Export <i className="mdi mdi-cloud-download"></i></Button>
							<Button className="btn button-round-effect balance-interval-btn btn-year-for-demo" size="sm" style={{ marginLeft: '20px' }} onClick={this.props.getSingleVaultData}>Single Vault Txns</Button>
							<Button className="btn button-round-effect balance-interval-btn btn-year-for-demo" size="sm" style={{ marginLeft: '20px' }} onClick={this.props.getSharedVaultData}>Shared Vault Txns</Button>
							</CardTitle>
							{/* <CardSubtitle></CardSubtitle> */}
						</div>
						<div className="ml-auto d-flex no-block align-items-center">

							<ul className="list-inline font-12 mr-3 mb-0">
								<li className="border-0 p-0 text-info list-inline-item">
									<label className="label mr-2 select-vault-lbl"> From </label>
								</li>
								<li className="border-0 p-0 text-info list-inline-item form-sel">
									{/* <a href="" className="btn btn-secondary btn-date dropdown-toggle mr-2 button-round-effect">May 08, 2019</a> */}
									<DatePicker
										format="yyyy/MM/dd"
										value={this.props.startDate}
										onChange={this.props.handleChangeStartDatePicker}
									/>
								</li>
								<li className="border-0 p-0 text-info list-inline-item" style={{ marginLeft: '10px' }}>
									<label className="label mr-2 select-vault-lbl"> To </label>
								</li>
								<li className="border-0 p-0 text-primary list-inline-item form-sel">
									{/* <a href="" className="btn btn-secondary btn-date dropdown-toggle mr-2 button-round-effect">May 12, 2019</a> */}
									<DatePicker
										format="yyyy/MM/dd"
										value={this.props.endDate}
										onChange={this.props.handleChangeEndDatePicker}
									/>
								</li>
								<li className="border-0 p-0 text-info list-inline-item">
									<Button className={`btn button-round-effect balance-interval-btn ${trasnactionHistoryFlag === 'all' ? 'btn-year-for-demo' : ''}`} size="sm" onClick={(e) => this.props.onFilterTrasactions(e, 'all')}>All</Button>
								</li>
								<li className="border-0 p-0 text-primary list-inline-item">
									<Button className={`btn button-round-effect balance-interval-btn ${trasnactionHistoryFlag === 'sent' ? 'btn-year-for-demo' : ''}`} size="sm" onClick={(e) => this.props.onFilterTrasactions(e, 'sent')}>Sent</Button>
								</li>
								<li className="border-0 p-0 text-primary list-inline-item">
									<Button className={`btn button-round-effect balance-interval-btn ${trasnactionHistoryFlag === 'receive' ? 'btn-year-for-demo' : ''}`} size="sm" onClick={(e) => this.props.onFilterTrasactions(e, 'receive')}>Receive</Button>
								</li>
							</ul>
						</div>
					</div>

					<Container fluid>
						<div>
							{
								!isTxnsLoading ?
									filterTrasnactionHistory.map((transaction, index) => {
										return (<RowData key={index} {...this.props} transaction={transaction} />)
									}) :
									<LoadingOverlay
										className="btn btn-success btn-create-vault"
										active={isTxnsLoading}
										spinner
										text='Please wait ......'
									></LoadingOverlay>
							}
						</div>
						<div>
							{
								!isTxnsLoading && filterTrasnactionHistory.length < 1 && 'No Transactions'
							}
						</div>
					</Container>
				</CardBody>
			</Card>
		);
	}
}

export default Transactions;