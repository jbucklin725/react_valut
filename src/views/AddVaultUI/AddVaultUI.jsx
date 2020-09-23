import React from 'react';
import {
    Input,
    Button,
    Row,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import Select from 'react-select';
import AddVaultAuthModalPopup from '../../components/modalPopup/AddVaultAuthModalPopup';

class AddVaultUI extends React.Component {
    render() {
        const { props } = this.props;

        return (
            <div>
                <Modal isOpen={true}
                    fade={true} style={{ marginTop: '25vh'}}>
                    <ModalHeader className="bg-modal"></ModalHeader>
                    <ModalBody className="bg-modal">
                                    <div className="modal-text  aligncenter ">Add New Vault</div> <br />
                                    <div className="stepsCount aligncenter">
                                        <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div>
                                        <div className="stepJoin"></div>
                                        <div className="stepComplete"></div>
                                    </div>
                                    <div className="textdiv">
                                        <Row className="modalfont">
                                            <Col>Vault Settings</Col>
                                            <Col>Summary</Col>
                                        </Row>
                                    </div>
                                    <div className="v-middle table-QR transaction-table signUpTblAuth vault-in divTextCenter" responsive="true">
                                        <Row>
                                            <Col className="aligncenter light-font"><p>Vault Name : </p><br />
                                                <p>Crypto Asset : </p><br />
                                                <p>Vault Type : </p>
                                            </Col>
                                            <Col className=""><Input type="text"
                                                id="vaultName"
                                                placeholder="Vault Name"
                                                onChange={props.handleVaultName}
                                                value={props.vaultName}
                                            ></Input><br />
                                                {
                                                    !props.isLoadingCryptoAsset && props.tokensList.length > 0 ?
                                                        <Select className="vault-type-select"
                                                            value={props.cryptoAsset}
                                                            onChange={props.handleCryptoAssetChange}
                                                            options={props.tokensList}
                                                        />
                                                        : <LoadingOverlay
                                                            active={props.isLoadingCryptoAsset}
                                                            spinner
                                                            text='Please wait ......' >
                                                            Please wait ......
                                    </LoadingOverlay>
                                                }
                                                <br />
                                                <div className="groupOptions light-font">
                                                    <Row className="radiorow">
                                                        <Col className="pull-left"><p><input type="radio" name="vaultType" value="single" checked={props.vaultType === 'single'} onChange={props.onChangeVaultType} />
                                                        <span class="min-wdth"></span>Single</p>
                                        </Col>
                                                        <Col className="pull-right">
                                                        <p><input type="radio" name="vaultType" value="shared" checked={props.vaultType === 'shared'} onChange={props.onChangeVaultType} />
                                                        <span class="min-wdth"></span>Shared</p>
                                        </Col>
                                                    </Row>


                                                </div>
                                            </Col>
                                        </Row>
                                        <Row> 
                                            <div class="art-icon">
                                            <div class="col-md-4 px-0">
                                            <i className="mdi mdi-alert mdi-alert-design"></i>
                                            </div>
                                            <div class="col-md-8 ">
                                            <span className="alerttext light-font">You will be prompted to perform  2FA authentication before creating a new Vault.</span>
                                            </div>
                                            </div>
                                        </Row>
                                       
                                    </div>
                    </ModalBody>
                    <ModalFooter className="bg-modal">
                        <Row className="width-footer-withdraw pl-0 withdraw-light">
                            <Col className="pull-left pl-0 a-left">
                            <Button className="btn btn-success"
                                            onClick={props.onCloseAction}>Back</Button>
                            </Col>

                            <Col className="pull-right a-right">
                            {!props.isLoading ?
                                             <Button className="btn btn-success"
                                             onClick={props.onSubmitAddVault}
                                             disabled={props.isLoading}>Continue</Button> : <LoadingOverlay
                                                 className="btn btn-success buttonStyle "
                                                 active={props.isLoading}
                                                 spinner
                                                 text='Please wait ......' >
                                             Please wait ......
                                         </LoadingOverlay>}
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
                <AddVaultAuthModalPopup {...this.props} />
            </div>
        );
    }
}

export default AddVaultUI;