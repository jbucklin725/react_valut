import React from 'react';
import {
    Input,
    Table,
    Button,
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained'
import LoginHydroModalPopup from '../../components/modalPopup/LoginHydroModalPopup'
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class LoginUI extends React.Component {
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
                                <tr className="border-0"><td><span className="create-vault-text">Login to Vault</span> </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input type="text" placeholder="UserName..."
                                            id="username"
                                            onChange={props.onInputChange}
                                            value={props.username}>
                                        </Input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Input type="password" placeholder="Password..."
                                        id="password"
                                        onChange={props.onInputChange}
                                        value={props.password}
                                    ></Input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><nav>
                                        <Link className="forgotTxt" to="/forgot_password">Forgot Password?</Link>
                                    </nav></td>
                                </tr>
                                <tr>
                                    <td>
                                        {
                                            props.error && <span className="show-error-text">{props.error}</span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="padding-text-div">
                                        {!props.isLoading ?
                                            <Button className="btn btn-success btn-create-vault"
                                                onClick={props.onSubmit}
                                                disabled={props.isLoading}>Login</Button> : <LoadingOverlay
                                                    className="btn btn-success btn-create-vault"
                                                    active={props.isLoading}
                                                    spinner
                                                    text='Please wait ......' >
                                                Please wait ......
                                            </LoadingOverlay>}
                                    </td>
                                </tr>
                                <tr>
                                <td className="signup">
                                    <div className=" padding-text-div center-t sign-log col-md-12">
                                            <nav>
                                                <Link className=" padding-text-div center-t col-md-12" to="/register">Sign Up</Link>
                                            </nav>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                    <LoginHydroModalPopup {...this.props} />


                </Col>
            </Row>
        </div>

    }
}

export default LoginUI;