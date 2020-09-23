import React from 'react';
import GoogleAuthUI from '../../../views/Authentication/GoogleAuthUI';
import Footer1 from '../../footer/footer';

class GoogleAuth extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <GoogleAuthUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default GoogleAuth;