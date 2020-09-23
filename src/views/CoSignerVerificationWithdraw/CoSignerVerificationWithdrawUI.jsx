import React from 'react';
import {
    Table,
    Button,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';

class CoSignerVerificationWithdrawUI extends React.Component {
    render() {
        const { props } = this.props;
        return <div className="">
            <Modal className="signer_verify" isOpen={true}
                fade={true} style={{ marginTop: '23vh', width: '26%' }}>
                <ModalHeader className="bg-modal "><i className="mdi mdi-arrow-left" onClick={props.onCancelWithdraw}></i></ModalHeader>
                <div className="">
                    <ModalBody className="bg-modal ">
                        <form>
                            <Table className="v-middle transaction-table signUpTbl col-md-6 offset-md-3" responsive>
                                <thead>
                                    <tr className="border-0"><td><span className=" d-flex justify-content-center create-vault-text">{props.vault_name}</span> <br />
                                    Hi<br />{props.intiEmail} has invited you to be part of this shared Vault. <br /> <br />
                                    Please kindly accept or reject the invitation.</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button className="btn btn-success btn-create-vault"
                                                onClick={(e) => props.onCoSignerVerification(e, true)}>Yes</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Button className="btn btn-success btn-create-vault"
                                                onClick={(e) => props.onCoSignerVerification(e, false)}
                                            >No</Button>
                                        </td>
                                    </tr>

                                    {props.isLoading ?
                                        <LoadingOverlay
                                            className="btn btn-success btn-create-vault"
                                            active={props.isLoading}
                                            spinner
                                            text='Please wait ......' >
                                            Please wait ......
                                            </LoadingOverlay> : ''}

                                </tbody>
                            </Table>
                        </form>

                    </ModalBody>
                </div>
            </Modal>
        </div>
    }
}

export default CoSignerVerificationWithdrawUI;