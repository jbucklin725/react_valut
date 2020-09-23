import React from 'react';
import LoginUI from '../../views/LoginUI/LoginUI';
import Footer1 from '../footer1/footer1.jsx';

class LoginComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <LoginUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default LoginComponent;