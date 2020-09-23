import React from 'react';
import {
    Table,
    Button,
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained'
import LoadingOverlay from 'react-loading-overlay';

class CoSignerVerificationVaultUI extends React.Component {
    render() {
        const { props } = this.props;
        return <div className="">
            <Row className="">
                <Col className="" sm={6} lg={6}>
                    <VaultExplained />

                </Col>
                <Col sm={6} lg={6} className="sign-right-t-b-p">

                    <form>
                        <Table className="v-middle transaction-table signUpTbl col-md-6 offset-md-3" responsive>
                            <thead>
                                <tr className="border-0">
                                    <td><span className="create-vault-text invite">You have been invited by {props.email} to join this Shared Vault. </span> <br /> <br />
                                    <span className="create-vault-text invite-1">Please confirm you accept being added as a co-signer of {props.vault_name}.</span></td>
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

                </Col>
            </Row>
        </div>
    }
}

export default CoSignerVerificationVaultUI;