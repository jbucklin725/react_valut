import React from 'react';
import {
    Input,
    Row,
    Col,
    Button
} from 'reactstrap';
import Select from 'react-select';
import Slider from 'react-rangeslider';

import AddSignerWarningModalPopupUI from '../../components/modalPopup/AddSignerWarningPopupUI.jsx'
import SignerSummaryComponent from '../../components/signerSummaryComponent/SignerSummaryComponent.jsx'
import CoSignerAuthModalPopup from '../../components/modalPopup/CoSignerModalAuth';

const RowData = (data) => {

    const { signer, props } = data

    return (
        <span>
            <i className="mdi mdi-account"></i>
            <em className="tooltiptext">({signer}) <br />
            </em>
            <input className="check-sign-1" type="checkbox" value=""></input>
            <i class="mdi mdi-close-box-outline" onClick={(e) => props.onRemoveCoSigner(e, signer)}></i>
        </span>
    )
}

class sharedVaultUI extends React.Component {
    render() {
        const props = this.props.props;

        return (<div className="auth-container shared-vault">
            {
                !props.isCoSignerSummaryOnePopupModal ?

                    <div className="shared">
                        <div className="container">
                            <div className="row d-flex justify-content-center">

                                <div className="col-md-5">
                                    <div className="modal-text  aligncenter"><h3>Shared Vault Configuration</h3></div> <br />
                                    <div className="stepsCount aligncenter">
                                        <div className="stepCompleteWithdraw solidBg"><span className="light-font">1</span></div>
                                        <div className="stepJoin"></div>
                                        <div className="stepCompleteWithdraw"><span className="light-font">2</span></div>
                                    </div>
                                    <div className="textdiv width100 shared-top">
                                        <div className="row">
                                            <div className="col">Configuration</div>
                                            <div className="col">Vault Summary</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row shared-form d-flex justify-content-center">
                                <div className="col-md-7">
                                    <Row>
                                        <Col md={3} className="light-font"><p>Vault Name : </p><br />
                                            <p>Crypto Asset : </p><br />
                                            <p>Signatures needed : </p><br />
                                        </Col>
                                        <Col md={9} className="">
                                            <Input type="text"
                                                id="sharedVaultData_vaultName"
                                                placeholder="Vault Name"
                                                value={props.sharedVaultData_vaultName}
                                                onChange={props.handleSharedVaultName}
                                            ></Input><br />
                                            <Select className="vault-type-select"
                                                value={props.sharedVaultData_cryptoAsset}
                                                options={props.tokensList}
                                                onChange={props.handleCryptoSelectForSharedVault}
                                            />
                                            <div className="slidecontainer">
                                                {/* Slider */}
                                                <Slider
                                                    value={props.sharedVaultData_maxSigner}
                                                    orientation="horizontal"
                                                    onChange={props.handleOnChangeSlider}
                                                    tooltip={true}
                                                    max={5}
                                                />
                                                {/* We need add here  */}
                                                <div class="range-value">
                                                    {props.sharedVaultData_maxSigner}/5
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>
                                    <div className="signature">
                                        <p>The signatures needs is the number of signatures needs to perform withdraw operations within this vault.</p>
                                    </div>
                                    <div className="signer">
                                        <h3>Signer</h3>
                                        <Row >
                                            <Col className="d-flex justify-content-center">
                                                {
                                                    props.sharedVaultData_coSignerData.length > 0 ?
                                                        props.sharedVaultData_coSignerData.map((signer, idx) => {
                                                            return (<RowData index={idx} {...this.props} signer={signer} />)
                                                        }) :
                                                        ''
                                                }
                                            </Col>
                                        </Row>
                                        <h4>Add co-signer:</h4>
                                        <Row>
                                            <Col md={3} className="light-font"><p>Email : </p><br />
                                            </Col>
                                            <Col md={9} className=""><Input type="text"
                                                id="sharedVaultData_currentCoSignerEmail"
                                                placeholder="Email"
                                                value={props.sharedVaultData_currentCoSignerEmail}
                                                onChange={props.handleSharedVaultEmailCurrentCoSigner}
                                            ></Input><br />
                                                {
                                                    props.sharedVaultData_currentCoSignerEmail ?
                                                        <input className="add-btn" type="button" value="Add" onClick={props.handleAddCoSignerCountAndData}></input>
                                                        : ''
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="art-icon_info">
                                                <Col className="information_icon">
                                                    <i className="mdi mdi-information-variant"></i>
                                                </Col>

                                                <Col className="col-md-11">
                                                    <div className="informationtext light-font">
                                                        <p>Only VAULT users can be added as a co-signers</p></div>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <div className="shared-popup">
                                            <Button className="btn btn-success" onClick={props.onBackFromShared}>Back</Button>
                                            <Button className="btn btn-success pull-right" onClick={props.onOpenAuthForCreateSharedVault}>Continue</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            props.isOpenAuthForCreateSharedVault ? <CoSignerAuthModalPopup props={this.props.props} /> : ''
                        }
                        <AddSignerWarningModalPopupUI {...this.props.props} />
                    </div>
                    : <SignerSummaryComponent {...props} />
            }
        </div>
        )
    }
}

export default sharedVaultUI;