import React from 'react';
import TwoFaOptionsUI from '../../views/Authentication/twofaUI';
import Footer1 from '../footer/footer';

class TwoOptions2FAComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <TwoFaOptionsUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default TwoOptions2FAComponent;