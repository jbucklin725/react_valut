import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Button
} from 'reactstrap';

import Select from 'react-select';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class DepositeSummaryModalPopup extends React.Component {

    render() {
        const props = this.props;

        return (
            <div>
                <Modal isOpen={props.isDepositNextOpen}
                    fade={props.isDepositNextFade} style={{ marginTop: '23vh', width: '20%' }}>
                    <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCloseDeposit}></i></ModalHeader>
                    <ModalBody className="bg-modal">
                        <div className="modal-text  aligncenter">Deposit</div> <br />
                        <div className="stepsCount aligncenter">
                            <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div>
                            <div className="stepJoin"></div>
                            <div className="stepComplete solidBg"><i className="mdi  mdi-check"></i></div>
                        </div>
                        <div className="textdiv width100">
                            <Row className="modalfont ">
                                <Col>Select Vault</Col>
                                <Col>Receive</Col>
                            </Row>
                        </div>
                        <div className=" divDepositeCenter" responsive>

                            <span className="p-deposite-modal"><span className="withdraw-light">Address For : </span> <span className="">{props.depositVaultSelect ? props.depositVaultSelect.name : ''}</span></span>
                            <picture >
                                <img className="img-deposite-qr"
                                    src={props.depositVaultSelect ? `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${props.depositVaultSelect.address}` : ''}
                                    alt="QR CODE"
                                />
                            </picture>
                            <div className="">
                            </div>
                            <div>
                            </div>
                            <span className="deposit-modal-f">
                                <Select
                                    value={props.depositVaultSelect}
                                    onChange={props.handleDepositVaultSelect}
                                    options={props.vaults}
                                    defaultValue={props.depositVaultSelect}
                                    placeholder="Select Vault Address"
                                />
                            </span>
                            <span className="deposit-modal-f adr-va">
                                <em>Vault Address:</em> {props.depositVaultSelect ? props.depositVaultSelect.address : ''}
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter className="bg-modal">
                        <Row className="width-footer-withdraw pl-0 withdraw-light">
                            <Col className="pull-left pl-0 a-left">
                                {
                                    props.isCopied ? 
                                    <Button className="btn btn-success disabled" onClick={props.onCopied}>
                                    <span>Copied</span>
                                 </Button> :
                                <Button className="btn btn-success" onClick={props.onCopied}><CopyToClipboard text={props.depositVaultSelect ? props.depositVaultSelect.address : ''}>
                                <span>Copy</span>
                            </CopyToClipboard> </Button>
                                }
                                
                            </Col>

                            <Col className="pull-right a-right">
                                <Button className="btn btn-success" onClick={props.onCloseDeposit}>Close</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default DepositeSummaryModalPopup;

