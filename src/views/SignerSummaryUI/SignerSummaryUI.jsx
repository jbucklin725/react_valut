import React from 'react';
import {
    Input,
    Row,
    Col,
    Button
} from 'reactstrap';
import Select from 'react-select';

const RowData = (data) => {
    return (
        <span>
            <i className="mdi mdi-account"></i>
            <em className="tooltiptext">({data.signer}) <br />
            </em>
            <input className="check-sign-1" type="checkbox" value=""></input>
        </span>
    )
}

class SignerSummaryUI extends React.Component {
    render() {
        const props = this.props;

        return (
            <div class="shared summary">
                <div className="container">
                    <div className="row d-flex justify-content-center">

                        <div className="col-md-5">
                            <div className="modal-text  aligncenter"><h3>Summary</h3></div> <br />
                            <div className="stepsCount aligncenter">
                                {/* <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div> */}
                                <div className="stepCompleteWithdraw solidBg"><span className="light-font">1</span></div>
                                <div className="stepJoin"></div>
                                <div className="stepCompleteWithdraw solidBg"><span className="light-font">2</span></div>
                            </div>
                            <div className="textdiv width100 shared-top">
                                <div className="row">
                                    <div className="col">Vault Settings</div>
                                    <div className="col">Summary</div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row shared-form d-flex justify-content-center">
                        <div className="col-md-7">
                            <Row>
                                <Col md={3} className="light-font"><p>Vault Name : </p><br />
                                    <p>Crypto Asset : </p><br />
                                </Col>
                                <Col md={9} className=""><Input type="text"
                                    id="sharedVaultData_vaultName"
                                    placeholder="My 1st vault"
                                    value={props.sharedVaultData_vaultName}
                                    onChange={props.handleSharedVaultName}
                                ></Input><br />
                                    <Select className="vault-type-select"
                                        value={props.sharedVaultData_cryptoAsset}
                                        options={props.tokensList}
                                        onChange={props.handleCryptoSelectForSharedVault}
                                    /><br />
                                </Col>
                            </Row>
                            <div className="signer">
                                <h3>Signers</h3>
                                <Row >
                                    <Col className="d-flex justify-content-center">
                                        {
                                            props.sharedVaultData_coSignerData.length > 0 ?
                                                props.sharedVaultData_coSignerData.map((signer, idx) => {
                                                    return (<RowData key={idx} {...this.props} signer={signer} />)
                                                }) :
                                                ''
                                        }
                                    </Col>
                                </Row>
                                <div class="row">
                                    <div class="art-icon">
                                        <div class="col-md-2 px-0">
                                            <i class="mdi mdi-alert mdi-information-variant"></i>
                                        </div>
                                        <div class="col-md-10 ">
                                            <div class="alerttext light-font">
                                                <p>Valut will be available after all the designated co-signers<br />
                                                    finish their corresponding approval process.</p></div>
                                        </div>
                                    </div>
                                </div>
                                <Row className="p-t-20 withdraw-light">
                                    <Col>
                                        <button type="button" class="btn btn-success btn btn-secondary">Back</button></Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button className="btn pull-left btn-complete" onClick={props.onCancelWithdraw}>Close</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SignerSummaryUI;