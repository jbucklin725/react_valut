import React from 'react';
import {
    Button,
    Row,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';

class WithdrawWarningModalPopup extends React.Component {

    render() {

        const props = this.props;

        return (
            <div>
                <Modal isOpen={props.isWithdrawNextOpen}
                    fade={props.isWithdrawNextFade} style={{ marginTop: '23vh', width: '25%' }}>
                    <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCancelWithdraw}></i></ModalHeader>
                    <div className="">
                        <ModalBody className="bg-modal">
                            <div className="modal-text  aligncenter color-r">Warning!</div> <br />
                            <div className="modal-text  aligncenter color-r">{props.withdrawAmount} {props.withdrawVaultSelect ? props.withdrawVaultSelect.currency : 'ETH'}</div> <br />
                            <div className="stepsCount aligncenter">
                                {/* <div className="stepComplete solidBg"> <i className="mdi  mdi-check"></i></div> */}
                                <div className="stepCompleteWithdraw solidBg"><span className="light-font">1</span></div>
                                <div className="stepJoin"></div>
                                <div className="stepCompleteWithdraw"><span className="light-font">2</span></div>
                            </div>
                            <div className="textdiv width100">
                                <Row className="modalfont ">
                                    <Col>Details</Col>
                                    <Col>Confirmation</Col>
                                </Row>
                            </div>
                            <div className="withdrow-inner-container">

                                <Row className="p-t-20 withdraw-light"><Col>You are about to send <b>{props.withdrawAmount} {props.withdrawVaultSelect ? props.withdrawVaultSelect.currency : 'ETH'}</b><br />
                                    to address <b className="text-wrap">{props.withdrawReceiver}</b>.<br />
                                    You are interacting with the <b>ETH chain</b>, provided by <b>MYEtherWallet</b>.<br />
                                    <b>Are you sure you want to do this?</b></Col></Row>

                            </div>

                        </ModalBody>
                        {
                            props.withdrawError && <span>{props.withdrawError}</span>
                        }
                        <ModalFooter className="bg-modal divTextCenter">
                            <Row className="divTextCenter">

                                <Button className="btn btn-secondary btn-user button-round-effect border-green aligncenter" onClick={props.onCancelWithdraw}>No, Get me out of here!</Button><br />
                                {
                                    !props.withdrawLoading ?

                                        <Button className="btn button-round-effect btn-complete aligncenter" onClick={props.onSubmitWithdraw}>Yes, I am sure! Make transaction</Button>
                                        :
                                        <LoadingOverlay
                                            className="btn btn-success"
                                            active={props.withdrawLoading}
                                            spinner
                                            text='Please wait ......'
                                        >
                                            Please wait ......
                                            </LoadingOverlay>
                                }
                            </Row>
                        </ModalFooter>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default WithdrawWarningModalPopup;