import React from 'react';
import RegisterUI from '../../views/RegisterUI/RegisterUI.jsx';
import Footer1 from '../footer1/footer1.jsx';

class RegisterComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <RegisterUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default RegisterComponent;