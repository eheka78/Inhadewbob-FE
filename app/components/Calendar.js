import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../constants/colors";

LocaleConfig.locales.fr = {
    monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
    monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'fr';

const INITIAL_DATE = new Date();


export default function calendarForm({ selectedDate, setSelectedDate }) {
    // react-native-calendars

    // 참고 자료
    // https://ha-jenong.tistory.com/93
    // https://github.com/wix/react-native-calendars/blob/master/example/src/screens/calendarScreen.tsx


    const onDayPress = useCallback((day) => {
        setSelectedDate(day.dateString);
    }, []);



    return (
        <SafeAreaView style={styles.modalbg}>
            <View style={styles.container}>
                <Calendar
                    firstDay={1}    // 월요일부터
                    style={styles.calendarbox}
                    current={INITIAL_DATE}
                    monthFormat={'yyyy.MM'}
                    hideExtraDays={false}
                    onDayPress={onDayPress}
                    markedDates={{
                        // '2025-11-01': { dotColor: 'orange', selected: true, marked: true, selectedColor: 'blue' },
                        // '2025-11-02': { dotColor: 'orange', marked: true },
                        // '2025-11-03': { dotColor: 'orange', selected: true, marked: true },
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: colors.primary,
                            selectedTextColor: 'white'
                        }
                    }}
                    theme={{
                        'stylesheet.calendar.header': {
                            dayTextAtIndex5: {  // 토요일 요일 텍스트 색상
                                color: '#709ef8ff',
                            },
                            dayTextAtIndex6: {  // 일요일 요일 텍스트 색상
                                color: '#0353f5ff',
                            }
                        },
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#000',
                        todayBackgroundColor: '#E6EEF5',
                        dayTextColor: '#000',
                        textDisabledColor: '#d9e1e8',
                        arrowColor: '#5B5B5B',
                    }}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    modalbg: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    confirmButtonText: {
        padding: 5,
        margin: 10,
        fontSize: 16,
    },
    calendarbox: {
        borderRadius: 8,
    },
});