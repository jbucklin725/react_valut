import React from 'react';
import {
    Input,
    Button
} from 'reactstrap';

class HydroAuthSignInUI extends React.Component {
    render() {
        const props = this.props.props;
        return <div className="auth-container">
            <div className="logo-style-sign">

                <label>VAULT</label>
            </div>
            <div className="v-middle table-QR transaction-table signUpTblAuth col-lg-8  offset-lg-2 divTextCenter" responsive>
                <div className="create-vault-text">Raindrop 2FA</div> <br />
                <div className=""><Input className="p-l-g aligncenter" type="text" placeholder="Enter your HydroID..."
                    id="hydroId"
                    onChange={props.onInputChange}
                    value={props.hydroId}>
                </Input> <br />
                </div>
                <Button className="btn btn-success btn-create-vault" onClick={props.onSubmit}>Submit</Button>
            </div>
            {
                props.isHydroIDGenrated ?
                    <div>
                        <span className="show-error-submitRegister"> {props.isHydroIDGenrated}</span>
                        <div>
                            <Button className="btn btn-success btn-create-vault" onClick={props.onHydroAuthnticate}>Authenticate</Button>
                        </div>
                    </div> : null
            }
        </div>

    }
}

export default HydroAuthSignInUI;