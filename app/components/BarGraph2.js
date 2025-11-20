import React from 'react';
import { View } from 'react-native';
import { BarChart } from "react-native-chart-kit";



const chartConfig = {
	backgroundGradientFrom: "white",
	backgroundGradientTo: "white",
	color: (opacity = 1) => `rgba(74, 132, 255, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 1.2,
	barRadius: 8,
	useShadowColorFromDataset: false // optional
};

const data = {
	labels: ["January", "February", "March"],
	datasets: [
		{
			data: [463, 345, 375]
		}
	]
};


const BarGraph2 = () => {
	// react-native-chart-kit
	// npm install react-native-chart-kit
	// https://www.npmjs.com/package/react-native-chart-kit?activeTab=readme

	return (
		<View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
			<BarChart
				data={data}
				width={350}
				height={300}
				chartConfig={chartConfig}
				showBarTops={false}
				fromZero={true}
				yAxisLabel=""
				yAxisSuffix="k"
			/>

		</View>
	);
};

export default BarGraph2;
