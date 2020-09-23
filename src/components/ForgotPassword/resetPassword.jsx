import React from 'react';
import ResetPasswordUI from '../../views/ForgotPassword/resetPassword';
import Footer1 from '../footer1/footer1.jsx';

class ResetPasswordComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <ResetPasswordUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default ResetPasswordComponent;