import React from 'react';
import HydroAuthSignInUI from '../../../views/Authentication/HydroAuthSignInUI';
import Footer1 from '../../footer/footer';

class HydroAuthSignIn extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <HydroAuthSignInUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default HydroAuthSignIn;