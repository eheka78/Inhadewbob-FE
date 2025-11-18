import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const data = [
	{
		stacks: [
			{ value: 200000, color: 'black' }, // 사용 금액
			{ value: 50000, color: 'lightgray', marginBottom: 2 }, // 남은 금액
		]
	}
];

export default function BarGraph1() {
	// react-native-chart-kit
	// npm install react-native-chart-kit
	// https://www.npmjs.com/package/react-native-chart-kit?activeTab=readme

	return (
		<View style={{ height: 100 }}>
			<BarChart
				horizontal
				stackData={data}
				width={250}
				noOfSections={4}
				dashWidth={0}  // dash 없애기!!!!
				yAxisThickness={0}
				xAxisThickness={0}
				showXAxisIndices={false}
				yAxisTextStyle={{ opacity: 0 }}
				renderTopLabel={() => null}
				barBorderRadius={5}
			/>
		</View>
	);
};
