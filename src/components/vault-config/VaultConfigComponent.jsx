import React from 'react';
import VaultConfigUI from '../../views/VaultConfigUI/VaultConfigUI.jsx'

class VaultConfigComponent extends React.Component {
    render() {
        return (
            <div className="page-content container-fluid">
            {/* <div className=""> */}
            <VaultConfigUI props={this.props}/>
            {/* </div> */}
        </div>
        )
    }
};

export default VaultConfigComponent;