import React from 'react';
import VerifyUserUI from '../../views/RegisterUI/VerifyUserUI.jsx';
import Footer1 from '../footer1/footer1.jsx';

class ConfirmUserComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <VerifyUserUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default ConfirmUserComponent;