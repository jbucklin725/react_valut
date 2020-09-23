import React from 'react';
import ResendVerificationEmailUI from '../../views/ForgotPassword/resendVerificationEmail';
import Footer1 from '../footer1/footer1.jsx';

class ResendVerificationEmailComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <ResendVerificationEmailUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default ResendVerificationEmailComponent;