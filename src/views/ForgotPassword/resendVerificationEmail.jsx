import React from 'react';
import {
    Input,
    Table,
    Button,
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained'
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class ResendVerificationEmailUI extends React.Component {
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
                                <td><span className="create-vault-text">Resend Verification Email</span> <br />
                                </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    <span className="show-error-text">Enter your email address in this field below. A temporary access link will be emailed to you shortly.</span> <br />
                                    <p></p>
                                        <Input type="text" placeholder="Email..."
                                            id="email"
                                            onChange={props.onInputChange}
                                            value={props.email}>
                                        </Input>
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td>
                                        {
                                            props.error && <span className="show-error-text">{props.error}</span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {
                                            props.responseMsg && <span className="show-error-text">{props.responseMsg}</span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="padding-text-div">
                                        {!props.isLoading ?
                                            <Button className="btn btn-success btn-create-vault"
                                                onClick={props.onSubmit}
                                                disabled={props.isLoading}
                                            >ReSend Email</Button> : <LoadingOverlay
                                                className="btn btn-success btn-create-vault"
                                                active={props.isLoading}
                                                spinner
                                                text='Please wait ......'
                                            >
                                                Please wait ......
                                            </LoadingOverlay>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className=" padding-text-div center-t col-md-12">
                                            <nav>
                                                <Link className=" padding-text-div center-t col-md-12" to="/register">Sign Up</Link>
                                            </nav>
                                        </div>
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

export default ResendVerificationEmailUI;