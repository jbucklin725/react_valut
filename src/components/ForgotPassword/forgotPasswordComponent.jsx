import React from 'react';
import ForgotPasswordUI from '../../views/ForgotPassword/forgotPassword';
import Footer1 from '../footer1/footer1.jsx';

class ForgotPasswordComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <ForgotPasswordUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default ForgotPasswordComponent;