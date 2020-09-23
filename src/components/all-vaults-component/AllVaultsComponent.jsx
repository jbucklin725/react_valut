import React from 'react';
import AllVaultsUI from '../../views/AllVaultsUI/AllVaultsUI.jsx';

class AllVaultsComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
            <div className="page-content-register vault-user container-fluid">
            <AllVaultsUI props={this.props}/>
            </div>
        </div>
        )
    }
};

export default AllVaultsComponent;