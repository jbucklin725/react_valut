import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained';
import { Link } from 'react-router-dom';

class VerifyUserUI extends React.Component {

    render() {
        return <div className="">
            <Row className="">
                <Col className="" sm={6} lg={6}>
                    <VaultExplained />

                </Col>
                <Col sm={6} lg={6} className="ConfirmUserDiv">
                    <form>
                        <div><h3 className="create-vault-text offset-md-2">Please verify your account we have sent you the email to verify your account Thanks !</h3>
                            <div className="padding-text-div  offset-md-2">
                                <span class="txt-i-back">
                                <nav>
                                        <Link className=" padding-text-div center-t col-md-12" to="/resend_email-verification">Resend Verification Email</Link>
                                    </nav>
                                </span>
                                <span className="txt-i-back p-l-i-back">
                                    <nav>
                                        <Link className=" padding-text-div center-t col-md-12" to="/">Login</Link>
                                    </nav>
                                </span></div>

                        </div>
                    </form>
                </Col>
            </Row>
        </div>

    }
}

export default VerifyUserUI;