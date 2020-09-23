import React from 'react';
import {
    Table,
    Button,
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained'

class TwoFaOptionsUI extends React.Component {
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
                                <td><span className="create-vault-text">Please Select 2FA Type</span> <br />
                                </td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td className="padding-text-div">
                                    <Button className="btn btn-success btn-create-vault"
                                                onClick={props.onSelectTfaType}
                                                id="gauth"
                                            >GAuth</Button>
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td className="padding-text-div">
                                    <Button className="btn btn-success btn-create-vault"
                                                onClick={props.onSelectTfaType}
                                                id="raindrop"
                                            >RainDrop 2FA</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </Col>
            </Row>
        </div>

    }
}

export default TwoFaOptionsUI;