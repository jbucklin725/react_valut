import React from "react";

import {
	Col,
	Row
	
} from 'reactstrap';
import backgroundphoto from '../../../assets/images/background/vault-login-back.jpg';
import MdPlay from 'react-ionicons/lib/MdPlay'

class VaultExplained extends React.Component {

	render() {
		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Login, Register, verify, Confirm- [General]                                                  */
			/*--------------------------------------------------------------------------------*/
					<div className="d-flex align-items-center">
						<div className="ml-auto d-flex align-items-center">
                        <div className="rotate-bg">
                        <picture>
                           <img className="responsive"
                            src={backgroundphoto}
                            alt="user"
                        />
                        </picture>
                    </div>
                    <div className="left-text-side-div">
                    <div>
                        <div className="logo-style-sign">

                            <label>VAULT</label>
                        </div>
                    </div>
                    <div className="vault-signup-signin">
                        <div className="vault-text-signup-signin">
                            <p>The Most Secure Method of<br /> Storing Your Crypto Assets</p>
                        </div>
                        <div className="vault-text2-signup-signin">
                            <p>Learn more about Vault and security we use to <br /> keep your tokens and coins safe</p>
                        </div>
                       <Row className="play-position ">
                           <Col sm={3} lg={2} className=""> <div className="circle"></div>
                           <MdPlay className="centered" fontSize="21px" color="#ffffff"/></Col>
                           <Col sm={3} lg={4} className=""> <div className="play-text pl-0">Vault Explained</div></Col>
                       </Row>
                    </div>
						</div>
					</div>
					</div>
		);
	}
}

export default VaultExplained ;