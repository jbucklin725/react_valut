import React from 'react';

import SignerSummaryUI from '../../views/SignerSummaryUI/SignerSummaryUI';

class SignerSummaryComponent extends React.Component {
    render() {
        const props = this.props;
        return (
            <SignerSummaryUI {...props} />
        )
    }
};

export default SignerSummaryComponent;