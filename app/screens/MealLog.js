import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Calendar from '../components/Calendar';
import WeeklyCalendar1 from '../components/WeeklyCalendar1';
import WeeklyCalendar2 from '../components/WeeklyCalendar2';
import { formatDateTime } from './../utils/FormatDateTime';
import MealList from '../components/MealList';
import {BottomSheetModal, BottomSheetView, BottomSheetModalProvider} from "@gorhom/bottom-sheet";


export default function MealLog({ navigation }) {
	const [selectedDate, setSelectedDate] = useState(''); // 캘린더에서 선택한 날짜 | default = 오늘

    useEffect(() => {
        if(!selectedDate) return;

        console.log("selectedDate: " + selectedDate);
        handlePresentModalPress();
    }, [selectedDate]);

    // bottomSheet 관련
    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

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
                                <WeeklyCalendar2 selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                                {/* 선택한 날짜 - 식단 기록 view */}
                                <View style={{ flex: 1, height: 900, }}>
                                    {/*<View>
                                        <Text>{formatDateTime(selectedDate)}</Text>
                                    </View>*/}

                                    <ScrollView>
                                        <MealList />
                                    </ScrollView>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    <ScrollView contentContainerStyle={{ padding: 16 }}>
                        {/* 월간 캘린더 */}
                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  />
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </BottomSheetModalProvider>
	);
}
