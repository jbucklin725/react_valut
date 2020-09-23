import React from 'react';
import {
    Input,
    Table,
    Button,
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class RegisterUI extends React.Component {
    render() {
        const { props } = this.props;
        return (
            <div>

                <Row className="">
                    <Col className="" sm={6} lg={6}>
                        <VaultExplained />

                    </Col>
                    <Col sm={6} lg={6} className="sign-right">
                        <form>
                            <Table className="v-middle transaction-table signUpTbl col-lg-3 offset-lg-3 " responsive>
                                <tbody>
                                    <tr style={{ border: '1px solid transparent' }}>
                                        <td className="create-vault-text-div create-vault-text">
                                            <span className="">
                                                Sign Up
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Input type="text" placeholder="First Name..."
                                                id="first_name"
                                                onChange={props.onInputChange}
                                                value={props.first_name}></Input>
                                            {props.first_name_error &&
                                                <span className="show-error-register"> {props.first_name_error}</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Input type="text" placeholder="Last Name..."
                                            id="last_name"
                                            onChange={props.onInputChange}
                                            value={props.last_name}></Input>
                                            {props.last_name_error &&
                                                <span className="show-error-register"> {props.last_name_error}</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Input type="text" placeholder="Email..."
                                            id="email"
                                            onChange={props.onInputChange}
                                            value={props.email}></Input>
                                            {props.email_error &&
                                                <span className="show-error-register"> {props.email_error}</span>}
                                        </td>

                                    </tr>
                                    <tr>
                                        <td><Input type="text" placeholder="Secondary Email..."
                                            id="secondary_email"
                                            onChange={props.onInputChange}
                                            value={props.secondary_email}></Input>
                                            {props.secondary_email_error &&
                                                <span className="show-error-register"> {props.secondary_email_error}</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Input type="password" placeholder="Password..."
                                            id="password"
                                            onChange={props.onInputChange}
                                            value={props.password}></Input>
                                            {props.password_error &&
                                                <span className="show-error-register"> {props.password_error}</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Input type="password" placeholder="Confirm Password..."
                                            id="confirm_password"
                                            onChange={props.onInputChange}
                                            value={props.confirm_password}></Input>
                                            {props.confirm_password_error &&
                                                <span className="show-error-register"> {props.confirm_password_error}</span>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="padding-text-div">
                                        
                                        {props.submitError &&
                                                <span className="show-error-submitRegister"> {props.submitError}</span>}
                                            {!props.isLoading ?
                                                <Button className="btn btn-success btn-create-vault"
                                                    onClick={props.onSubmit}
                                                    disabled={props.isLoading}
                                                >Sign Up</Button> : <LoadingOverlay
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

                                        <td className="padding-text-div">
                                            <nav>
                                                <Link className="mdi mdi-arrow-left txt-i-back txt-i-back p-l-i-back" to="/login">Back</Link>
                                            </nav>
                                        </td>
                                    </tr>
                                </tbody>

                            </Table>

                        </form>
                    </Col>
                </Row>
            </div>
        );

    }
}

export default RegisterUI;