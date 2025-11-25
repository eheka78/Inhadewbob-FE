import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../constants/colors";

const data = [
	{
		stacks: [
			{ value: 200000, color: colors.primary }, // 사용 금액
			{ value: 50000, color: colors.graphSubColor, marginBottom: 2 }, // 남은 금액
		]
	}
];

export default function BarGraph1() {
	// react-native-chart-kit
	// npm install react-native-chart-kit
	// https://www.npmjs.com/package/react-native-chart-kit?activeTab=readme

	return (
		<View style={{ height: 100, width: "100%", backgroundColor: "green" }}>
			<BarChart
				horizontal
				stackData={data}
				noOfSections={4}
				dashWidth={0}
				yAxisThickness={0}
				xAxisThickness={0}
				showXAxisIndices={false}
				yAxisTextStyle={{ opacity: 0 }}
				// yAxisLabelTexts={""}
				renderTopLabel={() => null}
				barBorderRadius={10}
				barWidth={15}
				// barMargin={0}
				initialSpacing={0}
				endSpacing={0}
				containerStyle={{ justifyContent: 'center', height: 50 }} // 가운데 정렬
			/>
		</View>
	);
};
