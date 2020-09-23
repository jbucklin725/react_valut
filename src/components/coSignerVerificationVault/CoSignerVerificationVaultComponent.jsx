import React from 'react';
import CoSignerVerificationVaultUI from '../../views/CoSignerVerification/CoSignerVerificationVault';
import Footer1 from '../footer1/footer1.jsx';

class CoSignerVerificationComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <CoSignerVerificationVaultUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default CoSignerVerificationComponent;