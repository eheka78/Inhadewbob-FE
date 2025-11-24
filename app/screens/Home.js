import {Text, View, Image, StyleSheet, Dimensions, Pressable, TextComponent, ScrollView} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { formatPrice3 } from '../utils/FormatPrice3';
import RecentFoodList from '../components/RecentFoodList';


const data = [
    { value: 360000, label: '10월 2주차', frontColor: colors.graphSubColor },
    { value: 230000, label: '10월 3주차', frontColor: colors.graphSubColor },
    { value: 120000, label: '10월 4주차', frontColor: colors.primary },
];

const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation, setHomeType }) {
    // 최대값 구해서 비율 계산
    const maxValue = Math.max(...data.map(item => item.value));
    const barMaxHeight = 120; // 막대 최대 높이(px)

    const total = 500000;
    const use = 35000;
    const useRatio = use/total * 100;
    console.log("useRatio: " + useRatio + "%");

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor:"white" }}>
                <ScrollView>
                    <View style={{ width: "90%", margin: "auto" }}>
                        <View>
                            <Image
                                source={require('../../assets/ganadi-hug.png')}
                                style={{ width: "100%", height: 150 }}  // height 지정 말고 방법이 있을지...
                                resizeMode="contain"
                            />


                            <View
                                style={{
                                    width: "100%",
                                    borderColor: "black",
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingVertical: 20, paddingHorizontal: 30,
                                }}
                            >
                                <Text style={{ fontWeight: "bold" }}>이번 주 지출 현황</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>사용 금액</Text>
                                    <Text>{formatPrice3(use)} / {formatPrice3(total)}</Text>
                                </View>


                                {/* <BarGraph1 /> */}
                                {/* BarGraph1의 padding 조절이 안되어서 차라리 그냥 만드는게 베스트... */}
                                <View
                                    style={{
                                        height: 20, width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        backgroundColor: colors.graphSubColor,
                                        borderRadius: 10,
                                        marginVertical: 20,
                                    }}
                                >
                                    <View style={{ backgroundColor: colors.primary, borderRadius: 10, height: 20, width:`${useRatio}%` }}></View>
                                </View>

                                <View style={{ flexDirection: "row", margin: "auto" }}>
                                    <Image
                                        source={require('../../assets/down-arrow-green.png')}
                                        style={{ width: 16 }}
                                        resizeMode="contain"
                                    />java
                                    <Text style={{ fontSize: 16, color: "#4CC55E" }}> 지난 주 대비 {formatPrice3(-5000)}</Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                width: "85%", height: "60",
                                margin: "auto",
                                marginVertical: 25,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Pressable
                                onPress={() => navigation.navigate('Roulette')}
                                style={{
                                    width: "47%",
                                    backgroundColor: colors.primary,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: 10
                                }}
                            >
                                <Text>룰렛</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('MealLog')}
                                style={{
                                    width: "47%",
                                    backgroundColor: "#FFE66D",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: 10
                                }}>
                                <Text>식단 기록</Text>
                            </Pressable>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                borderColor: "black",
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                                margin: "auto"
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>주차별 비교</Text>

                            {/* <BarGraph3 /> */}
                            {/* BarGraph3의 padding 조절이 안되어서 차라리 그냥 만드는게 베스트... */}
                            <View style={styles.container}>
                                <View style={styles.barContainer}>
                                    {data.map((item, index) => {
                                        // 각 막대의 높이를 계산
                                        // item.value / maxValue : 현재 값이 최대 값에 대한 비율
                                        // * barMaxHeight : 해당 비율을 막대 최대 높이에 곱하여 실제 픽셀 높이 계산
                                        const barHeight = (item.value / maxValue) * barMaxHeight;

                                        return (
                                            <View key={index} style={styles.barWrapper}>
                                                <Text style={styles.label}>{formatPrice3(item.value)}</Text>
                                                <View
                                                    style={[
                                                        styles.bar,
                                                        { height: barHeight, backgroundColor: item.frontColor },
                                                    ]}
                                                />
                                                <View style={styles.xAxisLine} />
                                                <Text style={styles.label}>{item.label}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>

                        <View style={{ padding: 20 }}></View>

                        <View>
                            <Text  style={{ fontWeight: "bold" }}>최근 식사</Text>

                            <RecentFoodList />
                        </View>


                        {/*<View*/}
                        {/*    style={{*/}
                        {/*        width: "100%",*/}
                        {/*        borderColor: "black",*/}
                        {/*        borderWidth: 1,*/}
                        {/*        borderRadius: 20,*/}
                        {/*        paddingVertical: 20,*/}
                        {/*        paddingHorizontal: 30,*/}
                        {/*        margin: "auto"*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Text style={{ fontWeight: "bold" }}>이번 주 메뉴 소비 분석</Text>*/}

                        {/*    <View style={styles.container}>*/}
                        {/*        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>*/}
                        {/*            <View style={{ width: "40%", flexDirection: "row", alignItems: "center" }}>*/}
                        {/*                <Image*/}
                        {/*                    source={require('../../assets/TempImg-circle.png')}*/}
                        {/*                    style={{ height: 30, width: 30, marginRight: 8 }}*/}
                        {/*                    resizeMode="contain"*/}
                        {/*                />*/}
                        {/*                <Text>중식</Text>*/}
                        {/*            </View>*/}

                        {/*            /!* 그래프 바 *!/*/}
                        {/*            <View*/}
                        {/*                style={{*/}
                        {/*                    flex: 1,*/}
                        {/*                    flexDirection: "row",*/}
                        {/*                    backgroundColor: colors.graphSubColor,*/}
                        {/*                    borderRadius: 10,*/}
                        {/*                    overflow: "hidden",*/}
                        {/*                    height: 12,*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                <View style={{ backgroundColor: colors.primary, width: "20%", borderRadius: 10 }} />*/}
                        {/*                <View style={{ backgroundColor: colors.graphSubColor, width: "80%" }} />*/}
                        {/*            </View>*/}

                        {/*            <Text style={{ width: 40, textAlign: "right" }}>20%</Text>*/}
                        {/*        </View>*/}

                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    container: {
        paddingTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    barContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',   // 왼쪽부터 쭉 배치
        alignItems: 'flex-end',
    },
    barWrapper: {
        width: 80,  // x축 줄 때문에 그냥 marginHorizontal 말고 width로 조정
        alignItems: 'center',
        // marginHorizontal: 10,   // 막대 사이 간격
    },
    bar: {
        width: 40,
        borderRadius: 6,
    },
    xAxisLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        marginBottom: 4,  // 막대와 레이블 사이 간격
    },
    label: {
        marginVertical: 5,
        fontSize: 12,
        textAlign: 'center',
    },
});

