import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import { colors } from "../constants/colors";
import { getWeekly } from '../api/dietLog';


export default function WeeklyCalendar2({ selectedDate, setSelectedDate }) {
    // react-native-calendar-strip
    // npm install react-native-calendar-strip

    // 참고 자료
    // https://github.com/BugiDev/react-native-calendar-strip
    // https://mindevlog.tistory.com/275#google_vignette

    const COLORS = ["red", "blue", "green"];
    const [markedDatesArray, setMarkedDatesArray] = useState();

    // markedDatesArray 변환 함수
    const convertWeeklyToMarked = (weeklyData) => {
        const marked = [];

        weeklyData.forEach((item) => {
            if (item.count > 0) {
                const dots = [];

                for (let i = 0; i < item.count && i < COLORS.length; i++) {
                    dots.push({
                        color: COLORS[i],
                        selectedColor: COLORS[i]
                    });
                }

                marked.push({
                    date: item.date,
                    dots: dots
                });
            }
        });

        return marked;
    };


    // mark 데이터 리스트 format 예시
    // const markedDatesArray = [
    //     {
    //         date: '2025-11-19',
    //         dots: [
    //             { color: 'red', selectedColor: 'blue' },
    //             { color: 'blue', selectedColor: 'red' },
    //         ],
    //     },
    //     {
    //         date: '2025-11-20',
    //         lines: [
    //             { color: 'green', selectedColor: 'yellow' },
    //         ],
    //     },
    // ];



    const loadWeekly = async (start, end) => {
        const data = await getWeekly(start, end);
        console.log("getWeekly 조회 성공: ", data);

        const marked = await convertWeeklyToMarked(data);
        setMarkedDatesArray(marked);
    };


    // 주간의 시작(월요일)과 끝(일요일) 날짜 계산 함수
    const getWeekRange = (date) => {
        const d = new Date(date);

        // JS는 일요일=0 ~ 토요일=6
        const day = d.getDay();

        // 월요일을 주의 시작으로: (day + 6) % 7
        const diffToMonday = (day + 6) % 7;

        const start = new Date(d);
        start.setDate(d.getDate() - diffToMonday);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return { start, end };
    };

    // selectedDate가 바뀔 때마다 주간 데이터 로드
    useEffect(() => {
        if (!selectedDate) return;

        const { start, end } = getWeekRange(selectedDate);

        // 주간 식단 info 가져오는 api - 포맷(YYYY-MM-DD)으로 변환하여 API 호출
        loadWeekly(
            start.toISOString().split("T")[0],
            end.toISOString().split("T")[0]
        );
    }, [selectedDate]);


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