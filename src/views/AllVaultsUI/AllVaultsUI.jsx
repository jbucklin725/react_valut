import React from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import Select from 'react-select';

const RowData = (data) => {
    const { vault, props } = data;
    return (
        <Col className="Accounts-container ">
            {
                vault.type === 'single' ? <div className="accounts-list color-f hvr-bounce-to-top">
                    <i class="mdi mdi-account"></i>
                    <Row><Col>Name: {vault.name}</Col></Row>
                    <Row><Col>Currency: {vault.currency ? vault.currency : 'ETH'}</Col>
                        <Col><Button className="btn btn-success btn-select-vault pull-right"
                            onClick={(e) => props.onSelectVault(e, vault)}
                        >Select Vault</Button></Col>
                    </Row>

                    <hr className="line"></hr>
                    <Row><Col className="text-wrap">Address: {vault.address}</Col></Row> <br />
                    <Row><Col className="text-wrap">Balance: {vault.balances ? parseFloat(vault.balances).toFixed(4): 0}</Col></Row>
                </div> :
                    <div className="accounts-list color-f hvr-bounce-to-top">
                        <i class="mdi mdi-account-multiple"></i>
                        <Row><Col>Name: {vault.name}</Col></Row>
                        <Row><Col>Currency: {vault.currency ? vault.currency : 'ETH'}</Col>
                            <Col><Button className="btn btn-success btn-select-vault pull-right"
                                onClick={(e) => props.onSelectSharedVault(e, vault)}
                            >Select Vault</Button></Col>
                        </Row>

                        <hr className="line"></hr>
                        <Row><Col className="text-wrap">Address: {vault.address}</Col></Row><br />
                        <Row><Col className="text-wrap">Balance: {vault.balances ? parseFloat(vault.balances).toFixed(4): 0}</Col></Row>
                        <hr className="line"></hr>
                        <Row><Col>
                            <div class="mdi mdi-eye pull-right mdi-24px"
                            onClick={(e) => props.onShowSharedVaultDetails(e, vault, true)}
                            ></div>
                        </Col></Row>
                    </div>
            }

        </Col>
    )
}

class AllVaultsUI extends React.Component {
    render() {
        const { props } = this.props;

        return <div className="auth-container">
            <div className="p-g-a">
                <label>VAULTS</label>
            </div>
            <div class="search-bar">
                <div class="row no-gutters ">
                    <div class="col-md-6 ">
                        <input type="search" placeholder="Search" aria-label="Search"></input>
                    </div>
                    <div class="col-md-3 ">
                        <Select className="vault-type-select "
                            value={props.selectedRangeFilter}
                            onChange={props.handleRangeFilter}
                            options={props.rangeFilters}
                            placeholder="Range"
                        />
                    </div>
                    <div class="col-md-3">
                        <Select className="vault-type-select "
                            value={props.selectedSortFilter}
                            onChange={props.handleSortFilter}
                            options={props.sortFilters}
                            placeholder="Sort by"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Row>
                    {
                        props.vaults.map((thread, idx) => {
                            return (<RowData key={idx} {...this.props} vault={thread} />)
                        })
                    }
                </Row>
            </div>
        </div>
    }
}

export default AllVaultsUI;