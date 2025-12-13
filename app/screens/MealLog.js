import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Calendar from '../components/Calendar';
import WeeklyCalendar1 from '../components/WeeklyCalendar1';
import WeeklyCalendar2 from '../components/WeeklyCalendar2';
import { formatDateTime } from './../utils/FormatDateTime';
import MealList from '../components/MealList';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { colors } from '../constants/colors';
import AddMealLogBottomSheet from '../components/AddMealLogBottomSheet';
import { GetWeekRange } from '../utils/GetWeekRange';
import { getDaily, getWeekly } from '../api/dietLog';
import { markColors } from '../constants/markColors';
import { useFocusEffect } from '@react-navigation/native';


export default function MealLog({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(''); // 캘린더에서 선택한 날짜 | default = 오늘

    useEffect(() => {
        if (!selectedDate) return;

        console.log("selectedDate: " + selectedDate);
        handlePresentModalPress();
    }, [selectedDate]);

    // bottomSheet 관련 - weekly calendar
    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);


    // bottomSheet2 관련 - 식단 추가
    const bottomSheetModalRef2 = useRef(null);

    const handlePresentModalPress2 = useCallback(() => {
        bottomSheetModalRef2.current?.present();
    }, []);

    const [weeklyMealList, setWeaklyMealList] = useState([]);
    const [dailyMealList, setDailyMealList] = useState([]);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);


    useFocusEffect(
        useCallback(() => {
            if (!weeklyMealList) return;

            const temp = weeklyMealList
                .filter(item => Number(item.count) > 0)   // 1️⃣ count 있는 날만
                .map(item => ({
                    date: item.date,                       // 2️⃣ 문자열 그대로
                    dots: Array.from({ length: Number(item.count) }, (_, i) => ({
                        color: markColors[i],
                        selectedColor: markColors[i],
                    })),
                }));

            setMarkedDatesArray(temp);
        }, [weeklyMealList])
    );

    useFocusEffect(
        useCallback(() => {
            if (!selectedDate) return;

            const fetchData = async () => {
                const { start, end } = GetWeekRange(selectedDate);

                const startDate = formatDateTime(start);
                const endDate = formatDateTime(end);

                console.log("주간 조회:", startDate, "~", endDate);

                const weekly = await getWeekly(startDate, endDate);
                console.log("weekly:", weekly);
                setWeaklyMealList(weekly);

                const tempDate = formatDateTime(selectedDate);

                const daily = await getDaily(tempDate);
                console.log("daily:");
                console.log(daily);

                setDailyMealList(daily);
            };

            fetchData();
        }, [selectedDate])
    );


    return (
        <BottomSheetModalProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={['100%']}
                        index={0}
                        enablePanDownToClose={true} // 아래로 스와이프하면 닫기
                    >
                        <BottomSheetView style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <WeeklyCalendar2
                                    selected={selectedDate}
                                    markedDatesArray={markedDatesArray}
                                />
                                <MealList dailyMealList={dailyMealList} />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>


                    {/*  */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef2}
                        snapPoints={['100%']}
                        index={0}
                        enablePanDownToClose={true} // 아래로 스와이프하면 닫기
                    >
                        <BottomSheetView style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <AddMealLogBottomSheet />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    <View style={{ height: "100%", padding: 16 }}>
                        {/* 월간 캘린더 */}
                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                        <Pressable
                            onPress={handlePresentModalPress2}
                            style={styles.addBtn}
                        >
                            <Image
                                source={require('../../assets/plus.png')}
                                style={styles.addImg}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </BottomSheetModalProvider>
    );
}


const styles = StyleSheet.create({
    addBtn: {
        position: "absolute",
        bottom: 20, right: 20,
        width: 40, height: 40,
        borderRadius: 25,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    addImg: {
        tintColor: "white",
        height: "60%",
        width: "60%",
    },
});
