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
import DepositeSummaryModalPopup from './DepositeModalSummaryUI';

class DepositeModalPopup extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                <Modal isOpen={props.isDepositIntiFade}
                    fade={props.isDepositIntiOpen} style={{ marginTop: '23vh', width: '20%' }}>
                    <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCancelWithdraw}></i></ModalHeader>
                    <ModalBody className="bg-modal">
                        <div className="modal-text  aligncenter">Deposit</div> <br />
                        <div className="stepsCount aligncenter">
                            <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div>
                            <div className="stepJoin"></div>
                            <div className="stepComplete"></div>
                        </div>
                        <div className="textdiv width100">
                            <Row className="modalfont ">
                                <Col>Select Vault</Col>
                                <Col>Receive</Col>
                            </Row>
                        </div>
                        <div className=" divDepositeCenter" responsive>

                        <span className="p-deposite-modal"><span className="withdraw-light">Address For : </span> <span className="">{props.depositVaultSelect ? props.depositVaultSelect.name : ''}</span></span>
                            
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
                        </div>
                    </ModalBody>
                    <ModalFooter className="bg-modal">
                        <Row className="width-footer-withdraw pl-0 withdraw-light">
                            <Col className="pull-left pl-0 a-left">
                                <Button className="btn btn-success" onClick={props.onCancelWithdraw}>Close</Button>
                            </Col>

                            <Col className="pull-right a-right">
                                <Button className="btn btn-success" onClick={props.onShowNextDepositSummary}>Next</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
                <DepositeSummaryModalPopup {...this.props} />
            </div>
        );
    }
}
export default DepositeModalPopup;

