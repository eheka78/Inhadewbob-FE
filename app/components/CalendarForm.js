import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

/* locale */
LocaleConfig.locales.kr = {
    monthNames: [
        "01월", "02월", "03월", "04월", "05월", "06월",
        "07월", "08월", "09월", "10월", "11월", "12월",
    ],
    monthNamesShort: [
        "01월", "02월", "03월", "04월", "05월", "06월",
        "07월", "08월", "09월", "10월", "11월", "12월",
    ],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "kr";

export default function CalendarForm({
    selectedDate,
    setSelectedDate,
    setShowWeekly
}) {
    const [currentMonth, setCurrentMonth] = useState(
        selectedDate ? new Date(selectedDate) : new Date()
    );

    /* 월 이동 */
    const moveMonth = (diff) => {
        const next = new Date(currentMonth);
        next.setMonth(currentMonth.getMonth() + diff);
        setCurrentMonth(next);
    };

    /* 헤더 라벨 */
    const getYearLabel = (date) => {
        return `${date.getFullYear()}년`;
    };
    const getMonthLabel = (date) => {
        return `${date.getMonth() + 1}월`;
    };

    const calendarTheme = {
        backgroundColor: "#fff",
        calendarBackground: "#fff",

        textSectionTitleColor: "#6B7280",
        textDayFontSize: 14,
        textDayFontWeight: "500",

        dayTextColor: "#111827",
        todayTextColor: colors.primary,
        todayBackgroundColor: "#EEF2FF",

        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: "#fff",

        "stylesheet.calendar.header": {
            dayTextAtIndex5: { color: "#6366F1" }, // 토
            dayTextAtIndex6: { color: "#EF4444" }, // 일
        },
    };

    return (
        <SafeAreaView style={styles.modalbg}>
            <View style={styles.card}>
                {/* 커스텀 헤더 */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => moveMonth(-1)}
                        hitSlop={10}
                        style={styles.arrowBtn}
                    >
                        <Image
                            source={require("../../assets/left-arrow.png")}
                            style={styles.arrowImg}
                        />
                    </Pressable>

                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <Text style={styles.yearText}>
                            {getYearLabel(currentMonth)}
                        </Text>
                        <Text style={styles.monthText}>
                            {getMonthLabel(currentMonth)}
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => moveMonth(1)}
                        hitSlop={10}
                        style={styles.arrowBtn}
                    >
                        <Image
                            source={require("../../assets/right-arrow.png")}
                            style={styles.arrowImg}
                        />
                    </Pressable>
                </View>


                {/* 캘린더 */}
                <Calendar
                    key={currentMonth.toISOString()}    // 커스텀 헤더의 이동 버튼이랑 연결
                    current={currentMonth.toISOString().split("T")[0]}
                    firstDay={1}
                    hideArrows
                    renderHeader={() => null}
                    onMonthChange={(month) => {
                        setCurrentMonth(new Date(month.dateString));
                    }}
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        setShowWeekly(true);
                    }}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: colors.primary,
                            selectedTextColor: "#fff",
                        },
                    }}
                    theme={calendarTheme}
                />
            </View>
        </SafeAreaView>
    );
}

/* styles */
const styles = StyleSheet.create({
    modalbg: {
        flex: 1,
        alignItems: "center",
        marginTop: 35,
    },

    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 20,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 8,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        marginBottom: 15,
    },
    yearText: {
        fontSize: 14,
        color: "black",
    },

    monthText: {
        fontSize: 30,
        fontWeight: "700",
        color: "black",
    },

    arrowBtn: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },

    arrowImg: {
        width: 18,
        height: 18,
        tintColor: "#111827",
    },
});
