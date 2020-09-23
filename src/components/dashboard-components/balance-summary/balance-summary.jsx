import React from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Col,
	Row
} from 'reactstrap';
import LineChart from './LineChart';

class BalanceSummary extends React.Component {

	render() {
		// const { currentFilterType } = this.props;
		return (
			<Card>
				<CardBody>
					<div className="d-flex justify-content-between">
						<div>
							<CardTitle>Balance history</CardTitle>
						</div>
						<div className="grap">
						
						<button type="button" class="btn-1">Week</button>
						<button type="button" class="btn-1">1m</button>
						<button type="button" class="btn-1">3m</button>
						<button type="button" class="btn-1">6m</button>
						<button type="button" class="btn-1">1Y</button>
						<button type="button" class="btn-1 active">All</button>
						</div>

					</div>

					<Row>
						<Col lg="12">
							<div className="campaign ct-charts">
								<div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
									<LineChart  {...this.props} />
								</div>
							</div>
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}
}

export default BalanceSummary;
