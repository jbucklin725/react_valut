import React from 'react';
import CoSignerVerificationWithdrawUI from '../../views/CoSignerVerificationWithdraw/CoSignerVerificationWithdrawUI';
import Footer1 from '../footer1/footer1.jsx';

class CoSignerVerificationWithdrawComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <CoSignerVerificationWithdrawUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default CoSignerVerificationWithdrawComponent;