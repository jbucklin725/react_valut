import React from 'react';
import AddVaultUI from '../../views/AddVaultUI/AddVaultUI.jsx';
import VaultSummaryUI from '../../views/VaultSummaryUI/VaultSummaryUI.jsx'

class AddVaultComponent extends React.Component {
    render() {
        return (
            <div className="page-wrapper-register d-block">
                <div className="page-content-register container-fluid">
                    {
                        !this.props.isSummaryPage ? <AddVaultUI props={this.props} /> :
                            <VaultSummaryUI props={this.props} />

                    }
                </div>
            </div>
        )
    }
};

export default AddVaultComponent;