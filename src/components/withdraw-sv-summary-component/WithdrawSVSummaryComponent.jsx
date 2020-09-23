import React from 'react';

import WithdrawSVSummaryUI from '../../views/WithdrawSVSummaryUI/WithdrawSVSummaryUI';

class WithdrawSVSummaryComponent extends React.Component {
    render() {
        const props = this.props;
        return (
            <WithdrawSVSummaryUI {...props} />
        )
    }
};

export default WithdrawSVSummaryComponent;