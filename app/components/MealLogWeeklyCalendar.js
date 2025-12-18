import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { deleteDiet } from "../api/diets";
import { colors } from "../constants/colors";
import MealList from "./MealList";
import { getDaily, getWeekly } from "../api/dietLog";
import { formatDateTime } from "../utils/FormatDateTime";
import { GetWeekRange } from "../utils/GetWeekRange";
import { markColors } from "../constants/markColors";


export default function MealLogWeeklyCalendar({ selectedDate, setSelectedDate, setShowWeekly }) {
    const [selected, setSelected] = useState(new Date(selectedDate));
    const [daily, setDaily] = useState(null);
    const [loading, setLoading] = useState(false);

    const startOfWeek = new Date(selected);     // 월요일 시작
    const day = startOfWeek.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return d;
    });

    // selected 변경될 때마다 daily fetch
    useEffect(() => {
        const fetchDaily = async () => {
            try {
                setLoading(true);

                const tempDate = selected.toISOString().split("T")[0];

                const result = await getDaily(tempDate);
                setDaily(result);
            } catch (e) {
                console.error("getDaily error:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchDaily();
    }, [selected]);

    const [weeklyMealList, setWeaklyMealList] = useState([]);


    const moveWeek = (direction) => {
        const newDate = new Date(selected);
        newDate.setDate(selected.getDate() + direction * 7);
        setSelected(newDate);
    };


    useEffect(() => {
        const fetchWeekly = async () => {
            try {
                const { start, end } = GetWeekRange(selected);

                const startDate = formatDateTime(start);
                const endDate = formatDateTime(end);

                console.log("주간 조회:", startDate, "~", endDate);

                const weekly = await getWeekly(startDate, endDate);

                setWeaklyMealList(weekly);
            
            } catch (e) {
                console.error("getWeekly error:", e);
            }
        };

        fetchWeekly();
    }, [selected]);


    // 
    const getMealCountByDate = (date) => {
        const key = date.toISOString().split("T")[0];
        const found = weeklyMealList.find(item => item.date === key);
        return found?.count || 0;
    };

    // 몇 년 몇 월
    const getYearMonthLabel = (date) => {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    };

    
// const handleDelete = (id) => {
//   Alert.alert(
//     "삭제할까?",
//     "이 식단 기록을 삭제합니다.",
//     [
//       { text: "취소", style: "cancel" },
//       {
//         text: "삭제",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await deleteDiet(id);
//             console.log("삭제 완료 id:", id);
//             await fetchDaily(selected); // ✅ 삭제 후 다시 불러오기
//             // 점(weekly count)도 바로 갱신 원하면 weekly fetch도 여기서 같이 호출
//           } catch (e) {
//             console.log("삭제 실패", e?.response?.status, e?.response?.data, e?.message);
//           }
//         },
//       },
//     ]
//   );
// };


    return (
        <View style={styles.container}>
            {/* 닫기 버튼 */}
            <Pressable
                onPress={() => {
                    console.log(selected.toISOString().split("T")[0]);
                    setSelectedDate(selected.toISOString().split("T")[0]);
                    setShowWeekly(false);
                }}
                hitSlop={10}
                style={({ pressed }) => [
                    styles.closeBtn,
                    pressed && { opacity: 0.4 },
                ]}
            >
                <Image
                    source={require("../../assets/close.png")}
                    style={styles.closeImg}
                />
            </Pressable>

            {/* 주간 카드 박스 */}
            <View style={styles.box}>
                {/* 헤더 */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => moveWeek(-1)}
                        hitSlop={10}
                        style={styles.arrowBtn}
                    >
                        <Image
                            source={require("../../assets/left-arrow.png")}
                            style={styles.arrowImg}
                        />
                    </Pressable>

                    <Text style={styles.title}>
                        {getYearMonthLabel(selected)}
                    </Text>

                    <Pressable
                        onPress={() => moveWeek(1)}
                        hitSlop={10}
                        style={styles.arrowBtn}
                    >
                        <Image
                            source={require("../../assets/right-arrow.png")}
                            style={styles.arrowImg}
                        />
                    </Pressable>
                </View>

                {/* 주간 날짜 */}
                <View style={styles.row}>
                    {days.map((date) => {
                        const isSelected =
                            date.toDateString() === selected.toDateString();

                        const count = getMealCountByDate(date);

                        // 날짜, 요일, 해당 일의 식단 갯수(점)
                        return (
                            <Pressable
                                key={date.toDateString()}
                                onPress={() => setSelected(date)}
                                style={({ pressed }) => [
                                    styles.dayBox,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Text style={[
                                    styles.weekday,
                                    isSelected && styles.selectedText,
                                ]}>
                                    {date.toLocaleDateString("ko-KR", { weekday: "short" })}
                                </Text>

                                <Text style={[
                                    styles.date,
                                    isSelected && styles.selectedText,
                                ]}>
                                    {date.getDate()}
                                </Text>

                                <View style={styles.dotRow}>
                                    {/* 최대 5개 */}
                                    {Array.from({ length: Math.min(count, 5) }).map((_, idx) => (
                                        <View
                                            key={idx}
                                            style={[
                                                styles.dot,
                                                { backgroundColor: markColors[idx % markColors.length] },
                                            ]}
                                        />
                                    ))}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            {/* MealList */}
            <View style={styles.mealContainer}>
                {loading ? (
                    <Text style={{ marginTop: 12 }}>로딩 중...</Text>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.mealScroll}
                    >
                        <MealList dailyMealList={daily} />
                    </ScrollView>
                )}
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    closeBtn: {
        position: "absolute",
        top: 20,
        right: 20,

        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    closeImg: {
        width: 16,
        height: 16,
        tintColor: "#9CA3AF",
    },
    
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
    },
    box: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 7,
        elevation: 7,
    },
    mealBox: {
        marginTop: -6,
        paddingTop: 24,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 4,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: -0.3,
        color: "#111827",
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
        tintColor: "black",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dayBox: {
        width: 44,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    pressedBox: {
        opacity: 0.7,
    },
    weekday: {
        fontSize: 12,
        color: "#6B7280",
    },
    date: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    selectedText: {
        color: colors.primary,
        fontWeight: "bold",
    },
    dotRow: {
        flexDirection: "row",
        marginTop: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 1,
    },

    mealContainer: {
        flex: 1,
    },
    mealScroll: {
        paddingHorizontal: 10,
        paddingBottom: 24,
    },
});
