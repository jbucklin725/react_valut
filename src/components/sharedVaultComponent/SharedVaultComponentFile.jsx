import React from 'react';
import SharedVaultUI from '../../views/sharedVaultUI/sharedVaultUI.jsx'

class SharedVaultComponent extends React.Component {
    render() {
        return (
            <div className="page-content container-fluid">
            <SharedVaultUI props={this.props}/>
        </div>
        )
    }
};

export default SharedVaultComponent;