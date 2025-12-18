// MealLogMonthlyCalendar.js
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from 'react';

import CalendarForm from '../components/CalendarForm';
import AddMealLogBottomSheet from './AddMealLogBottomSheet';
import { colors } from '../constants/colors';


export default function MealLogMonthlyCalendar({
    selectedDate,
    setSelectedDate,
    setShowWeekly,
}) {

    // bottomSheet2 관련 - 식단 추가
    const bottomSheetModalRef2 = useRef(null);

    const handlePresentModalPress2 = useCallback(() => {
        bottomSheetModalRef2.current?.present();
    }, []);


    return (
        <BottomSheetModalProvider>
            {/* 식단 추가  */}
            <BottomSheetModal
                ref={bottomSheetModalRef2}
                snapPoints={['100%']}
                index={0}
                enablePanDownToClose={true} // 아래로 스와이프하면 닫기
                keyboardBehavior="fill" 
                keyboardBlurBehavior="restore"
            >
                <AddMealLogBottomSheet/>
            </BottomSheetModal >


            <View style={{ height: "100%", padding: 16 }}>
                {/* 월간 캘린더 */}
                <CalendarForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} setShowWeekly={setShowWeekly} />

                {/* 식단 추가 버튼 */}
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