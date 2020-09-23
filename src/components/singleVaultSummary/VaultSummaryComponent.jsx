import React from 'react';
import VaultSummaryUI from '../../views/VaultSummaryUI/VaultSummaryUI.jsx'
import Footer1 from '../footer/footer';

class VaultSummaryComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register container-fluid">
            <VaultSummaryUI props={this.props}/>
            </div>
            <Footer1 />
        </div>
        )
    }
};

export default VaultSummaryComponent;