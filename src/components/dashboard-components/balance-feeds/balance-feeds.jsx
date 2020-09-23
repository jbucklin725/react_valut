import React from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Row,
	Col,
	Button
} from 'reactstrap';

const SignerRowData = (data) => {

	const { signer } = data

	return (

		<div class="row signer"><div class="d-flex justify-content-center col">
			<span><i class="mdi mdi-account"></i><em class="tooltiptext">({signer.email}) <br /></em>
				<input class="check-sign-1" type="checkbox" value="" />
			</span>
		</div>
		</div>
	)
}

const RowData = (thread) => {
	const { balance } = thread;
	return (
		<div className="feed-body-division2">
			<div>
				<div>
					<Row className="balance-details" xs={10}>
						<Col xs={2}><i className="mdi mdi-water"></i></Col>
						<Col>
							<Row>
								<Col className="text-left">{balance.balances ? balance.balances : 0}<br />
									<div className="" style={{ color: '#676666' }}>{balance.currency}</div></Col>
								<Col className="text-right">0 $<br />
									<div className="" style={{ color: '#676666' }}>0 BTC</div></Col>
							</Row>
						</Col>
						<Col xs={2}><i className="mdi mdi-dots-vertical"></i></Col>
					</Row>

				</div>
			</div>
		</div>
	)
}

class BalanceFeeds extends React.Component {
	render() {
		let { vaultsBalance, totalVaultBalance, currentVaultType, totalBalance, sharedVaultDetails, selectedVault } = this.props;
		if (!selectedVault) {
			const userDetails = this.props.client_manager.auth.getUserDetails()
			selectedVault = {
				_id: userDetails.user_vault_id,
			}
		}
		var newClassName = '';
		vaultsBalance.length > 4 ? newClassName = "total_bal" : newClassName = "";

		return (
			<Card className="total">
				<CardBody className={newClassName}>
					<Row className="no-gutters">
						<Col><CardTitle>Total Balance</CardTitle></Col>
						<Col className="d-flex justify-content-end">
							{
								vaultsBalance && vaultsBalance.length > 1 ? <div className="switch-btn">
									<Button className={currentVaultType === 'all' ? "btn pull-right btn-complete active" : "btn pull-right btn-complete"} onClick={(e) => this.props.onSwitchVaultType(e, 'all')}>All</Button>
									<Button className={currentVaultType === 'single' ? "btn pull-right btn-complete active" : "btn pull-right btn-complete"} onClick={(e) => this.props.onSwitchVaultType(e, 'single')}>Single</Button>
									<Button className={currentVaultType === 'shared' ? "btn pull-right btn-complete active" : "btn pull-right btn-complete"} onClick={(e) => this.props.onSwitchVaultType(e, 'shared')}>Shared</Button>
									</div>
									: ''
							}
						</Col>
					</Row>

					<div className="feed-widget">
						{
							totalVaultBalance ?
								<div className="feed-body-content row">

									<div class="col-12">
										<div className="feed-body-division">
											<label className="feed-currency-symbol">$</label>
											<label className="feed-payment">305.23</label>
										</div>
										<div className="feed-payment-btc-span">
											<label className="feed-payment-btc">0.01234568 BTC</label>
										</div>
									</div>
								</div> :
								<div className="feed-body-content row">
									<div className="col-12">
										<div className="feed-body-division">
											<label className="feed-currency-symbol">BEAR</label>
											<label className="feed-payment text-left">{Number((totalBalance)).toLocaleString()}</label>
										</div> <br />
										<div className="feed-payment-btc-span">
											<label className="feed-payment-btc">0 BTC</label>
										</div>
									</div>
								</div>
						}

						{
							vaultsBalance.length > 0 ?

								vaultsBalance.map((balance, idx) => {
									return (<RowData key={idx} {...this.props} balance={balance} />)
								})
								: ''
						}
						<br />
						<Col className="d-flex justify-content-center">
							<Row>
								{
									(sharedVaultDetails && sharedVaultDetails.signers.length > 0) && (vaultsBalance.length < 2) ?
										sharedVaultDetails.signers.map((signer, idx) => {
											return (<SignerRowData index={idx} {...this.props} signer={signer} />)
										})
										: selectedVault._id && (selectedVault._id !== "undefined") && vaultsBalance.length < 2 ? <div className="get-va"> <Button className="btn pull-left btn-complete" onClick={(e) => this.props.onShowSharedVaultDetails(e, selectedVault, false)}>Get Vault Info</Button> </div> : ''
								}
							</Row>
						</Col>

					</div>
				</CardBody>
			</Card>
		);
	}
}

export default BalanceFeeds;