import React from 'react';
import {
    Input,
    Button,
    Row,
    Col,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import WithdrawWarningModalPopup from './WithdrawWarningModalUI';
import Select from 'react-select';
import scientificToDecimal from 'scientific-to-decimal';
import LoginHydroModalPopup from './LoginHydroModalPopup';

class WithdrawModalPopup extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                <Modal isOpen={props.isWithdrawIntiOpen}
                    fade={props.isWithdrawIntiFade} style={{ marginTop: '23vh', width: '25%' }}>
                    <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCancelWithdraw}></i></ModalHeader>
                    <div className="">
                        <ModalBody className="bg-modal">
                            <div className="modal-text  aligncenter">Withdraw from Vault</div> <br />
                            <div className="stepsCount aligncenter">
                                {/* <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div> */}
                                <div className="stepCompleteWithdraw solidBg"><span className="light-font">1</span></div>
                                <div className="stepJoin"></div>
                                <div className="stepCompleteWithdraw"><span className="light-font">2</span></div>
                            </div>
                            <div className="textdiv width100">
                                <Row className="modalfont">
                                    <Col>Details</Col>
                                    <Col>Confirmation</Col>
                                </Row>
                            </div>
                            <div className="withdrow-inner-container">
                                <Row className="p-t-20 withdraw-light"><Col>Vault to debit</Col></Row>
                                <Row className="p-t-10"><Col>

                                    <Select
                                        value={props.withdrawVaultSelect}
                                        onChange={props.handleWithdrawVaultSelect}
                                        options={props.vaults}
                                        defaultValue={props.selectedVault}
                                    />
                                </Col></Row>

                                <Row className="p-t-20 withdraw-light"><Col>Recipient address</Col></Row>
                                <Row className="p-t-10"><Col>
                                    <Input className="p-l-g" type="text" placeholder="x987654321bdsf34567"
                                        id="withdrawReceiver"
                                        onChange={props.onInputChange}
                                        value={props.withdrawReceiver}></Input>
                                </Col></Row>
                                <Row>
                                    <Col>
                                <Row className="p-t-20 withdraw-light"><Col>Select Currency</Col></Row>
                                <div>
                                    <Row className="p-t-10">
                                        <Col>
                                        <Input className="input-50" type="text" placeholder="ETH"
                                        id="withdrawAmount"
                                        value={ props.withdrawVaultSelect ? props.withdrawVaultSelect.currency : '' }
                                    ></Input>
                                    
                                        </Col>
                                    </Row>
                                    </div>
                                    </Col>
                                    <Col>
                                <Row className="p-t-20 withdraw-light"><Col>Amount</Col></Row>
                                <Row className="p-t-10 with-amount"><Col>
                                    <Input className="input-50" type="number" placeholder="0.01ETH" max={props.withdrawVaultSelect ? props.withdrawVaultSelect.balances : 1}
                                        id="withdrawAmount"
                                        onChange={ (e) => props.handleWithdrawAmount(e, props.withdrawVaultSelect ? props.withdrawVaultSelect.balances : 1)}
                                        value={props.withdrawAmount}
                                    ></Input>
                                </Col>
                                
                                </Row>
                                </Col>
                                </Row>
                                <Row className="p-t-20 withdraw-light">
                                    <Col>Total to debit<br />
                                    {props.withdrawAmount} {props.withdrawVaultSelect ? props.withdrawVaultSelect.currency : 'ETH'}</Col>
                                    <Col>Available Balance: <br/>{props.withdrawVaultSelect ? scientificToDecimal(props.withdrawVaultSelect.balances) : 0}  {props.withdrawVaultSelect ? props.withdrawVaultSelect.currency : 'ETH'}
                                    </Col>
                                </Row>
                                <Row className="p-t-20 withdraw-light">
                                <Col>
                                        <Button className="btn pull-left btn-complete" onClick={props.onCancelWithdraw}>Close</Button></Col>
                                    <Col>
                                        <Button className="btn pull-right btn-complete"
                                            onClick={props.onContinueWithdraw}
                                        >Continue</Button>
                                    </Col>
                                </Row>
                                
                            </div>

                        </ModalBody>
                    </div>
                </Modal>
                <LoginHydroModalPopup props = {this.props} />
                <WithdrawWarningModalPopup  {...this.props} />
            </div>
        );
    }
}
export default WithdrawModalPopup;