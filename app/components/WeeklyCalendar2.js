import React from 'react';
import { StyleSheet, View } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import {colors} from "../constants/colors";

export default function WeeklyCalendar2({ selectedDate, setSelectedDate }) {
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
                selectedDate={selectedDate} // selectedDate의 주간 달력 나오게
                onDateSelected={date => setSelectedDate(date)}
                
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                
                style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
                
                calendarHeaderStyle={{ color: 'black' }}
                calendarHeaderFormat="YYYY년 MM월"

                calendarColor={'white'}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                highlightDateNumberStyle={{ color: colors.primary }}
                highlightDateNameStyle={{ color: colors.primary }}

                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}

                iconLeft={require('../../assets/left-arrow-black.png')}
                iconRight={require('../../assets/right-arrow-black.png')}
                iconContainer={{ 
                    flex: 0.1,
                    tintColor: "black",
                }}
                
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