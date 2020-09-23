import React from 'react';
import SharedVaultStatusUI from '../../views/SharedVaultStatusUI/SharedVaultStatusUI.jsx'

class SharedVaultStatusComponent extends React.Component {
    render() {
        return (
            <div className="page-content container-fluid">
            <SharedVaultStatusUI props={this.props}/>
        </div>
        )
    }
};

export default SharedVaultStatusComponent;