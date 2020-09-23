import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import VaultExplained from '../../components/Shared-components/vault-explained/vault-explained';

class ConfirmUserUI extends React.Component {

    render() {
        const props = this.props.props;
        return <div className="">
            <Row className="">
                <Col className="" sm={6} lg={6}>
                    <VaultExplained />

                </Col>
                <Col sm={6} lg={6} className="ConfirmUserDiv">
                    {props.error ? <form><div><h3 className="create-vault-text offset-md-2">{props.error}</h3>
                        <div className="padding-text-div  offset-md-2"><span class="mdi mdi-arrow-left txt-i-back"></span><span className="txt-i-back p-l-i-back">Resend Email</span></div>
                    </div>
                    </form> :
                        !props.isLoading ?
                            <form>
                                <div><h3 className="create-vault-text offset-md-2">You have succesfully verified your account. Please log in</h3>
                                    <div className="padding-text-div  offset-md-2"><span class="mdi mdi-arrow-left txt-i-back"></span><span className="txt-i-back p-l-i-back">Login</span></div>
                                </div> </form> :
                            <LoadingOverlay
                                className="padding-text-div offset-md-2"
                                active={props.isLoading}
                                spinner
                                text='Please wait ......'
                            >
                                Please wait ......
                                            </LoadingOverlay>}

                </Col>
            </Row>
        </div>

    }
}

export default ConfirmUserUI;
