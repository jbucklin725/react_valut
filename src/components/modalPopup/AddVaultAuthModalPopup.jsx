// WithdrawAuthModalPopup
import React from 'react';
import {
    Input,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import IosLock from 'react-ionicons/lib/IosLockOutline';

class AddVaultAuthModalPopup extends React.Component {

    render() {
        const { props } = this.props;
        return (
            <div>
                <Modal className="authenticator" isOpen={props.modal} toggle={props.toggle}
                    fade={props.fade} style={{ marginTop: '25vh' }}>
                    <ModalHeader toggle={props.toggle} className="bg-modal"></ModalHeader>
                    <ModalBody className="bg-modal">
                        <div className="lockModalPopup divTextCenter" responsive>
                            <div className="lock-i"><IosLock className="lockIcon" onClick={() => alert('Hi!')} fontSize="96px" color="#3ad15e" /></div>
                            <div className="create-vault-text">2FA Authenticator</div> <br />
                            <div className="">
                                <Input className="p-l-g aligncenter" type="text" placeholder="Enter 6 digit 2FA code..."
                                    id="token"
                                    onChange={props.isAddNewVault ? props.handleToken : props.onInputChange}
                                    value={props.token}>
                                    >
                                    </Input> <br />
                            </div>
                            <div>
                                {!props.isGAuthLoading ?
                                    <Button className="btn btn-success btn-verify" onClick={props.onSubmitGoogleAuthTokenForAddNewVault}>Verify</Button> : <LoadingOverlay
                                        className="btn btn-success btn-create-vault"
                                        active={props.isGAuthLoading}
                                        spinner
                                        text='Please wait ......'
                                    >
                                        Please wait ......
                                            </LoadingOverlay>}

                            </div>
                            <span className="p-g-modal">Can't access your authentication app? <span className="p-g-u">Send an SMS instead</span></span>
                        </div>
                    </ModalBody>
                    <ModalFooter className="bg-modal">
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddVaultAuthModalPopup;