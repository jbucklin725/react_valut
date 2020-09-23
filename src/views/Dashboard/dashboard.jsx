import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { BalanceSummary, Transactions, BalanceFeeds } from '../../components/dashboard-components';
import VaultConfigComponent from '../../components/vault-config/VaultConfigComponent';

class DashboardComponent extends React.Component {

    render() {
        const { isConfigScreenShow } = this.props;
        return (
            <div>
                {
                    !isConfigScreenShow ?
                        <div>
                            <Row>
                                <Col sm={6} lg={8}>
                                    <BalanceSummary {...this.props} />
                                </Col>
                                <Col sm={6} lg={4}>
                                    <BalanceFeeds {...this.props} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Transactions {...this.props} />
                                </Col>
                            </Row>
                        </div>
                        : <VaultConfigComponent {...this.props} />
                }

            </div>
        );
    }
}

export default DashboardComponent;
