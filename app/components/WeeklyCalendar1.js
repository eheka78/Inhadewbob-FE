import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default function WeeklyCalendar1() {
    // react-native-calendar-strip
    // npm install react-native-calendar-strip

    // 참고 자료
    // https://github.com/BugiDev/react-native-calendar-strip
    // https://mindevlog.tistory.com/275#google_vignette


    // mark 해야하는 데이터 리스트
    const markedDatesArray = [
        {
            date: '2025-11-19',
            dots: [
                { color: 'red', selectedColor: 'blue' },
                { color: 'blue', selectedColor: 'red' },
            ],
        },
        {
            date: '2025-11-20',
            lines: [
                { color: 'green', selectedColor: 'yellow' },
            ],
        },
        {
            date: '2025-11-22',
            dots: [
                { color: 'red', selectedColor: 'blue' },
            ],
        },
    ];


    return (
        <View style={styles.container}>
            <CalendarStrip
                scrollable
                style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                calendarColor={'#3343CE'}
                calendarHeaderStyle={{ color: 'white' }}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                iconContainer={{ flex: 0.1 }}
                markedDates={markedDatesArray}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});