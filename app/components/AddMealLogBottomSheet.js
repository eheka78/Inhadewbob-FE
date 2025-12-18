import { Pressable, StyleSheet, Text, TextInput, View, Platform, InputAccessoryView, Keyboard, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/colors";
import { createDiet } from "../api/diets";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { formatDateTime } from "../utils/FormatDateTime";

export default function AddMealLogBottomSheet({onSuccess}) {
    const [dateTime, setDateTime] = useState(new Date());
    const [showIOSPicker, setShowIOSPicker] = useState(false);
    const [showAndroidDate, setShowAndroidDate] = useState(false);
    const [showAndroidTime, setShowAndroidTime] = useState(false);

    const [store, setStore] = useState('');
    const [menu, setMenu] = useState('');
    const [price, setPrice] = useState();

    const handleBottomSheet = async () => {
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        const formattedDay = dateTime.toISOString().split('T')[0];

        console.log("전송 데이터 확인", 
            {date: formattedDay,
            time: formattedTime, store, menu, price})

        try {
            const res = await createDiet({
                date: formattedDay, 
                time: formattedTime, restaurantName: store.trim(), menuName: menu.trim(), price:Number(price)
            });

            console.log("식단 등록 완료", res);
            setStore("");
            setMenu("");
            setPrice("");
            Keyboard.dismiss();
        } catch (e) {
            console.log("등록 실패");
        }
    };


    return (
        <BottomSheetScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
            enableOnAndroid={true}>
            <View style={{ flex: 1, padding: 30 }}>
                <Text style={styles.title}>식단 추가</Text>

                    {/* 시간 · 날짜 */}
                    <View style={{ marginVertical: 12 }}>
                        <Text style={styles.subTitle}>시간 · 날짜</Text>

                        {/* ------------ iOS: datetime 하나 ------------ */}
                        {Platform.OS === "ios" && (
                            <>
                                <Pressable
                                    style={styles.input}
                                    onPress={() => setShowIOSPicker(true)}
                                >
                                    <Text>
                                        {dateTime.toLocaleDateString()}{" "}
                                        {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </Pressable>

                                {showIOSPicker && (
                                    <>
                                        <DateTimePicker
                                            value={dateTime}
                                            mode="datetime"
                                            display="spinner"
                                            onChange={(event, selected) => {
                                                if (selected) setDateTime(selected);
                                            }}
                                        />

                                        <Pressable
                                            style={[styles.input, { borderColor: colors.primary }]}
                                            onPress={() => setShowIOSPicker(false)}
                                        >
                                            <Text style={{ textAlign: "center", color: colors.primary }}>
                                                완료
                                            </Text>
                                        </Pressable>
                                    </>
                                )}
                            </>
                        )}

                        {/* ------------ Android: date + time 나눔 ------------ */}
                        {Platform.OS === "android" && (
                            <>
                                {/* 날짜 */}
                                <Pressable
                                    style={styles.input}
                                    onPress={() => setShowAndroidDate(true)}
                                >
                                    <Text>
                                        {dateTime.toLocaleDateString()}
                                    </Text>
                                </Pressable>

                                {showAndroidDate && (
                                    <DateTimePicker
                                        value={dateTime}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selected) => {
                                            setShowAndroidDate(false);
                                            if (selected) {
                                                const updated = new Date(dateTime);
                                                updated.setFullYear(selected.getFullYear());
                                                updated.setMonth(selected.getMonth());
                                                updated.setDate(selected.getDate());
                                                setDateTime(updated);
                                            }
                                        }}
                                    />
                                )}

                                {/* 시간 */}
                                <Pressable
                                    style={styles.input}
                                    onPress={() => setShowAndroidTime(true)}
                                >
                                    <Text>
                                        {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </Pressable>

                                {showAndroidTime && (
                                    <DateTimePicker
                                        value={dateTime}
                                        mode="time"
                                        display="default"
                                        is24Hour={true}
                                        onChange={(event, selected) => {
                                            setShowAndroidTime(false);
                                            if (selected) {
                                                const updated = new Date(dateTime);
                                                updated.setHours(selected.getHours());
                                                updated.setMinutes(selected.getMinutes());
                                                setDateTime(updated);
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )}

                    </View>

                    {/* 가게 이름 */}
                    <View style={{ marginVertical: 12 }}>
                        <Text style={styles.subTitle}>가게 이름</Text>
                        <TextInput
                            placeholder="가게 이름을 입력하세요"
                            defaultValue={(store && store != 0) ? store : ""}
                            style={styles.input}
                            onChangeText={text => {
                                setStore(text);
                            }}
                        />
                    </View>

                    {/* 메뉴 이름 */}
                    <View style={{ marginVertical: 12 }}>
                        <Text style={styles.subTitle}>메뉴 이름</Text>
                        <TextInput
                            placeholder="메뉴 이름"
                            defaultValue={(menu && menu != 0) ? menu : ""}
                            style={styles.input}
                            onChangeText={text => {
                                setMenu(text);
                            }}
                        />
                    </View>

                    {/* 가격 */}
                    <View style={{ marginVertical: 12 }}>
                        <Text style={styles.subTitle}>가격</Text>

                        <TextInput
                            keyboardType="number-pad"
                            placeholder="가격을 입력하세요. (예: 8000)"
                            defaultValue={(price && price != 0) ? price : ""}
                            style={styles.input}
                            onChangeText={text => {
                                setPrice(text);
                            }}
                            inputAccessoryViewID={
                                Platform.OS === "ios" ? "InputID" : undefined
                            }
                        />
                    </View>

                    <Pressable
                        onPress={handleBottomSheet}
                        style={{
                            width: "100%",
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            borderRadius: 10,
                            borderWidth: 1,
                            paddingVertical: 13,
                            marginTop: 30
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "30",
                                fontSize: 20,
                                textAlign: "center"
                            }}
                        >
                            설정 완료
                        </Text>
                    </Pressable>

            </View>

            {/* iOS 전용 키보드 닫기 버튼 */}
            {Platform.OS === "ios" && (
                <InputAccessoryView nativeID="InputID">
                    <View style={{
                        backgroundColor: "#f2f2f277",
                        padding: 10,
                        alignItems: "flex-end",
                        borderTopWidth: 1,
                        borderColor: "#ddd"
                    }}>
                        <Pressable onPress={() => Keyboard.dismiss()}>
                            <Text style={{ fontSize: 16, color: colors.primary }}>완료</Text>
                        </Pressable>
                    </View>
                </InputAccessoryView>
            )}
        </BottomSheetScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center"
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        marginTop: 8
    }
});
