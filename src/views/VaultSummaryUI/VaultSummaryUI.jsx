import React from 'react';
import {
    Input,
    Button,
    Row,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import IosInformation from 'react-ionicons/lib/IosInformation'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class VaultSummaryUI extends React.Component {
    render() {
        const { props } = this.props;

        return (
            <div>
                <Modal isOpen={true}
                    fade={true} style={{ marginTop: '25vh' }}>
                    <ModalHeader className="bg-modal"></ModalHeader>
                    <ModalBody className="bg-modal">

                            <div className="modal-text  aligncenter ">Summary</div> <br />
                            <div className="stepsCount aligncenter">
                                <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div>
                                <div className="stepJoin"></div>
                                <div className="stepComplete solidBg"><i className="mdi  mdi-check"></i></div>
                            </div>
                            <div className="textdiv width100 ">
                                <Row className="modalfont">
                                    <Col>Vault Settings</Col>
                                    <Col>Summary</Col>
                                </Row>
                            </div>
                            <div className="v-middle table-QR transaction-table signUpTblAuth  divTextCenter" responsive="true">
                                <Row>
                                    <Col className="aligncenter light-font"><p>Vault Name : </p><br />
                                        <p>Crypto Asset : </p><br />
                                        <p>Vault address : </p><br />

                                    </Col>
                                    <Col className=""><Input type="text" placeholder="My 1st Vault" value={props.vaultName}></Input><br />
                                        <Input type="text" placeholder="Ethereum" value={props.cryptoAsset.label}></Input><br />
                                        <Input type="text" placeholder="Vault Adrees" value={props.newVaultSummary.walletAddress}></Input>
                                        <Button className="btn btn-success pull-right"><CopyToClipboard text={props.newVaultSummary.walletAddress}>
                                                <span>Copy</span>
                                            </CopyToClipboard>
                                            </Button>
                                    </Col>

                                </Row><br/>

                                <Row className="i-border">
                                    <IosInformation className="" fontSize="45px" color="#ffffff" padding-right="40px" border="1px solid red" />
                                    <span className="alerttext1 light-font">Vault created successfully!</span>
                                </Row>

                            </div>
                    </ModalBody>
                    <ModalFooter className="bg-modal">
                    <Row className="width-footer-withdraw pl-0 withdraw-light">
                            <Col className="pull-left pl-0 a-left">
                            {!props.isLoading ?
                                    <Button className="btn btn-success"
                                        onClick={props.onBackAction}
                                        disabled={props.isLoading}>Back</Button> : <LoadingOverlay
                                            className="btn btn-success"
                                            active={props.isLoading}
                                            spinner
                                            text='Please wait ......' >
                                        Please wait ......
                                </LoadingOverlay>}
                            </Col>

                            <Col className="pull-right a-right">
                            <Button className="btn btn-success"
                                    onClick={props.onCloseAction}>Close</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default VaultSummaryUI;