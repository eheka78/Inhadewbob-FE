import { Text, View, Image, StyleSheet, Dimensions, Pressable, TextComponent, ScrollView, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from '../constants/colors';
import { formatPrice3 } from '../utils/FormatPrice3';
import RecentFoodList from '../components/RecentFoodList';
import React, { useCallback, useEffect, useState } from "react";
import { getProfile } from '../api/auth';
import { getConsumeStat, getConsumeStats } from '../api/consumeLog';
import { GetPrevWeekLabel } from '../utils/GetPrevWeekLabel';
import { getLatest } from '../api/dietLog';
import RouletteSelectedFoodItem from '../components/RouletteSelectedFoodItem';
import { useFocusEffect } from '@react-navigation/native';

const BACKEND_URL = "https://inha-dewbob.p-e.kr";

let data = [
    { value: 0, label: '-', frontColor: colors.graphSubColor },
    { value: 0, label: '-', frontColor: colors.graphSubColor },
    { value: 0, label: '-', frontColor: colors.primary },
];

const screenWidth = Dimensions.get('window').width;
const today = new Date();

export default function Home({ navigation, setHomeType }) {
    const [userInfo, setUserInfo] = useState([]);

    // 최대값 구해서 비율 계산
    const maxValue = Math.max(...data.map(item => item.value));
    const barMaxHeight = 120; // 막대 최대 높이(px)

    const [budget, setBudget] = useState(0);
    const [thisWeekSpent, setThisWeekSpent] = useState(0);
    const [differenceFromLastWeekSpent, setDifferenceFromLastWeekSpent] = useState(0);
    const [useRatio, setUseRatio] = useState(0);   // = thisWeekSpent / budget * 100
    const [statistics, setStatistics] = useState([]);

    const [mealList, setMealList] = useState([]);


    useEffect(() => {
        console.log(mealList);
    }, [mealList]);

    const [notSavedMeal, setNotSavedMeal] = useState([]);

    // AsyncStorage에 저장된 룰렛에서 선택한 메뉴 가져오기
    const loadTempMeals = async () => {
        const data = await AsyncStorage.getItem("tempMeals");
        setNotSavedMeal(data ? JSON.parse(data) : []);
    };

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {

                // 프로필 조회
                await setUserInfo(await getProfile());

                // 소비 현황 조회
                const consumeRes = await getConsumeStat();
                setBudget(consumeRes.budget);
                setThisWeekSpent(consumeRes.thisWeekSpent);
                setDifferenceFromLastWeekSpent(consumeRes.differenceFromLastWeekSpent);


                // 소비 통계 조회
                const stats = await getConsumeStats();
                setStatistics(stats);
                // 최대 100%
                setUseRatio(Math.min((stats.thisWeekSpent / consumeRes.budget) * 100, 100));

                // 주차 계산
                data[2].value = stats.thisWeekSpent;
                data[2].label = `${stats.currentMonth}월 ${stats.currentWeek}주차`;

                data[1].value = stats.lastWeekSpent;
                data[1].label = await GetPrevWeekLabel(stats.currentMonth, stats.currentWeek, 1);

                data[0].value = stats.twoWeeksAgoSpent;
                data[0].label = await GetPrevWeekLabel(stats.currentMonth, stats.currentWeek, 2);
            };

            loadData();

            const fetchData = async () => {
                const temp = await getLatest();
                setMealList(temp ?? []);
            };

            fetchData();

            loadTempMeals();
        }, [])
    );


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: "white" }}>
                <ScrollView>
                    <View style={{ width: "90%", margin: "auto" }}>
                        <View>
                            {notSavedMeal.length > 0 && (
                                <RouletteSelectedFoodItem
                                    item={notSavedMeal[0]}
                                    loadTempMeals={loadTempMeals}
                                />
                            )}


                            <Image
                                source={require('../../assets/ganadi-hug.png')}
                                style={{ width: "100%", height: 150 }}  // height 지정 말고 방법이 있을지...
                                resizeMode="contain"
                            />


                            <View style={[styles.box]}>
                                <Text style={[styles.boxTitle]}>이번 주 지출 현황</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>사용 금액</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                color: thisWeekSpent > budget ? "#F88BB1" : "black",
                                                fontWeight: thisWeekSpent > budget ? "bold" : "normal",
                                            }}
                                        >
                                            {formatPrice3(thisWeekSpent)}
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {" "}/ {formatPrice3(budget)}
                                        </Text>
                                    </View>
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
                                    <View style={{ backgroundColor: colors.primary, borderRadius: 10, height: 20, width: `${useRatio}%` }}></View>
                                </View>

                                {/* 둘 중 하나 case에 맞게 switch */}
                                {
                                    differenceFromLastWeekSpent < 0 &&
                                    <View style={{ flexDirection: "row", margin: "auto" }}>
                                        <Image
                                            source={require('../../assets/down-arrow-green.png')}
                                            style={{ width: 16 }}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ fontSize: 16, color: "#4CC55E" }}> 지난 주 대비 {formatPrice3(differenceFromLastWeekSpent)}</Text>
                                    </View>
                                }
                                {
                                    differenceFromLastWeekSpent > 0 &&
                                    <View style={{ flexDirection: "row", margin: "auto" }}>
                                        <Image
                                            source={require('../../assets/up-arrow-pink.png')}
                                            style={{ width: 16 }}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ fontSize: 16, color: "#F88BB1" }}> 지난 주 대비 +{formatPrice3(differenceFromLastWeekSpent)}</Text>
                                    </View>
                                }
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
                                style={[
                                    styles.box, {
                                        width: "47%",
                                        backgroundColor: colors.primary,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        flexDirection: "row",
                                    }
                                ]}
                            >
                                <Image
                                    source={require('../../assets/roulette-tab.png')}
                                    style={{ tintColor: "white", height: 25, width: 45 }}
                                    resizeMode="contain"
                                />
                                <Text style={{ color: "white", fontWeight: "bold" }}>룰렛</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => navigation.navigate('MealLog')}
                                style={[
                                    styles.box, {
                                        width: "47%",
                                        backgroundColor: "#FFE66D",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        flexDirection: "row",
                                    }
                                ]}
                            >
                                <Image
                                    source={require('../../assets/calendar-tab.png')}
                                    style={{ tintColor: "black", height: 25, width: 40 }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontWeight: "bold" }}>식단 기록</Text>
                            </Pressable>
                        </View>

                        <View style={[styles.box]}>
                            <Text style={[styles.boxTitle]}>주차별 비교</Text>

                            {/* <BarGraph3 /> */}
                            {/* BarGraph3의 padding 조절이 안되어서 차라리 그냥 만드는게 베스트... */}
                            <View style={styles.container}>
                                <View style={styles.barContainer}>
                                    {data.map((item, index) => {
                                        // 각 막대의 높이를 계산
                                        // item.value / maxValue : 현재 값이 최대 값에 대한 비율
                                        // * barMaxHeight : 해당 비율을 막대 최대 높이에 곱하여 실제 픽셀 높이 계산
                                        const barHeight = (item.value / maxValue) * barMaxHeight;
                                        console.log(item);
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
                            <Text style={[styles.boxTitle]}>최근 식사</Text>

                            <RecentFoodList mealList={mealList} />
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

                    <Button
                        title="로그인 페이지로 이동"
                        onPress={() => navigation.getParent().navigate("Login")}
                    />
                    <Button
                        title="초기 설정"
                        onPress={() => navigation.getParent().navigate("InitialSetting")}
                    />
                    <Button
                        title="온보딩"
                        onPress={() => navigation.getParent().navigate("OnboardingPage")}
                    />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    container: {
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
    box: {  // 그림자 박스
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20, paddingHorizontal: 30,
        shadowColor: "#000", shadowOpacity: 0.12,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 7,
        elevation: 7,
        transform: [{ rotate: "0.02deg" }],
    },
    boxTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
    }
});

