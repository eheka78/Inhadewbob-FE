import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import { colors } from "../constants/colors";
import { getWeekly } from '../api/dietLog';
import { useFocusEffect } from '@react-navigation/native';


export default function WeeklyCalendar2({ selected, markedDatesArray }) {
    // react-native-calendar-strip
    // npm install react-native-calendar-strip
    
    // 참고 자료
    // https://github.com/BugiDev/react-native-calendar-strip
    // https://mindevlog.tistory.com/275#google_vignette

    const [selectedDate, setSelectedDate] = useState('');
    
    useFocusEffect(
        useCallback(() => {
            setSelectedDate(selected);
        }, [])
    );

    
    return (
        <View style={styles.container}>
            <CalendarStrip
                selectedDate={selectedDate} // selectedDate의 주간 달력 나오게
                onDateSelected={date => setSelectedDate(date)}

                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}

                style={{ height: 130, paddingTop: 10, paddingBottom: 10 }}

                calendarHeaderStyle={{ color: 'black', fontSize: 20, marginBottom: 10 }}
                calendarHeaderFormat="YYYY년 MM월"

                calendarColor={'white'}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                highlightDateNumberStyle={{ color: colors.primary }}
                highlightDateNameStyle={{ color: colors.primary }}

                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}

                iconLeft={require('../../assets/left-arrow.png')}
                iconRight={require('../../assets/right-arrow.png')}
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