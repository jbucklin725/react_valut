/* App.js */
import React from "react";
/**
 * Fusion Chart Library
 */
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Charts);

// $label <b>$dataValue</b>",

class LineChart extends React.Component {

	render() {
		const dataSource = {
			chart: {
				yaxisname: "Amount",
				anchorradius: "5",
				plottooltext: "<b>$dataValue</b>",
				showhovereffect: "1",
				showvalues: "0",
				numbersuffix: "", // number suffix
				theme: "fusion",
				anchorbgcolor: "#3ad15e",
				palettecolors: "#3ad15e"
			},
			data: this.props.graphDataWithLabels
		};
		return (
			<div>
				{
					this.props.graphDataWithLabels.length > 0 ?
						<ReactFusioncharts
							type="spline"
							width="100%"
							height="100%"
							dataFormat="JSON"
							dataSource={dataSource}
						/> : (
							"loading"
						)
				}

			</div>
		);
	}
}

export default LineChart;