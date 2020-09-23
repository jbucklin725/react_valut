import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Row,
    Col
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';

class AddSignerWarningModalPopup extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                <Modal isOpen={props.isCoSignerWarningPopupModal}
                    fade={props.isCoSignerWarningPopupFade} style={{ marginTop: '23vh', width: '35%' }}>
                    <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCancelSignerStepTwo}></i></ModalHeader>
                    <ModalBody className="bg-modal">
                        <div class="shared-popup">
                            <h3>Warning!</h3>
                            <p>
                                Please be aware that once a vault is created.<b>It is not posible to add or remove signers.</b>
                            </p>
                            <p>Make sure you check carefully all the information provided before you continue.</p>
                        </div>
                        <div>
                            {
                                props.error && <span className="show-error-text">{props.error}</span>
                            }
                        </div>
                        <Row className="p-t-20 withdraw-light">
                            <Col>
                                <Button className="btn pull-left btn-complete" onClick={props.onCancelSignerStepTwo}>Cancel</Button></Col>
                            <Col>

                                {
                                    props.isCreatingSharedVault ?
                                        <LoadingOverlay
                                            className="btn btn-success btn-create-vault"
                                            active={props.isCreatingSharedVault}
                                            spinner
                                            text='Please wait ......' > Please wait ......</LoadingOverlay>

                                        : <Button className="btn pull-right btn-complete"
                                            onClick={props.onStepThreeSharedVault}>

                                            Continue</Button>
                                }
                            </Col>
                        </Row>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default AddSignerWarningModalPopup;

