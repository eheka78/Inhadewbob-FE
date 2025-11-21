import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../constants/colors";
        

const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 1) => `rgba(74, 132, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1.2,
    barRadius: 8,
    useShadowColorFromDataset: false // optional
};


const data = [
    {value: 360, label: '10월 2주차', frontColor: colors.graphSubColor},
    {value: 230, label: '10월 3주차', frontColor: colors.graphSubColor},
    {value: 120, label: '10월 4주차', frontColor: colors.primary}
];


export default function BarGraph3() {
    // react-native-chart-kit
    // npm install react-native-chart-kit
    // https://www.npmjs.com/package/react-native-chart-kit?activeTab=readme


    return (
        <View style={{ width:"100%", backgroundColor:"green" }}>
            <BarChart
                chartConfig={chartConfig}
                barWidth={40}
                spacing={40}
                initialSpacing={40}
                noOfSections={3}
                dashWidth={0}
                barBorderRadius={5}
                data={data}
                showBarTops={false}
                fromZero={true}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor="#AAAAAA"
                yAxisLabel=""
                yAxisSuffix="k"
                showXAxisIndices={false}
                yAxisTextStyle={{ opacity: 0 }}
            />
        </View>
    );
};