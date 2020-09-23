import React from 'react';
import {
    Input,
    Button,
} from 'reactstrap';
import QRphoto from '../../assets/images/QRcode/QrGreen.png';
import LoadingOverlay from 'react-loading-overlay';

class GoogleAuthUI extends React.Component {
    render() {

        const { props } = this.props;

        return <div className="auth-container">
            <div className="logo-style-sign">

                <label>VAULT</label>
            </div>
            <div className="v-middle table-QR transaction-table signUpTblAuth col-lg-8  offset-lg-2 divTextCenter" responsive>
            <div className="create-vault-text">Google Authentication</div>
            {props.qrUrl ? <div>
                        <div>
                            <picture>
                                <img className="QrPhoto"
                                    src={props.qrUrl ? props.qrUrl : QRphoto}
                                    alt="QR CODE"
                                />
                            </picture>
                        </div>
                    </div> : null}
                    <div className="p-g-a">Open your authentication app and enter the code for <br /><div className="p-g-b aligncenter">Hydro Vault</div></div>
                    <div className=""><Input className="p-l-g aligncenter" type="text" placeholder="Enter 6 digit code..."
                            id="token"
                            onChange={props.onInputChange}
                            value={props.token}>
                        </Input>
                        </div>
                        <div className="padding-text-div">
                            {props.error &&
                                <span className="show-error-submitRegister"> {props.error}</span>} <br/>
                            {!props.isLoading ?
                                <Button className="btn btn-success btn-create-vault"
                                    onClick={props.onSubmit}
                                    disabled={props.isLoading}
                                >Verify</Button> : <LoadingOverlay
                                    className="btn btn-success btn-create-vault"
                                    active={props.isLoading}
                                    spinner
                                    text='Please wait ......'
                                >
                                    Please wait ......
                                            </LoadingOverlay>}
                        </div>
                        <div>
                            <br />
                            <span className="p-g-a">Can't access your authentication app? <span className="p-g-u">Send an SMS instead</span></span>
                        </div>
            </div>
        </div>

    }
}

export default GoogleAuthUI;