import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, InputAccessoryView, Keyboard, ScrollView } from "react-native";
import { FoodCategory } from '../constants/FoodCategory';
import { colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { formatPrice3 } from './../utils/FormatPrice3';


export default function BudgetCategoryBottomSheet({
    selectedBudget, setSelectedBudget, checked, setChecked, recBudget
}) {
    const [saved, setSaved] = useState(true);

    // bottomSheet 내부 예산, 카테고리(체크) 저장 변수
    const [budg, setbudg] = useState(selectedBudget);
    const [selec, setSelec] = useState(checked);


    // 체크했을 때, 체크하는 함수
    const toggle = (label) => {
        setSelec((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const handleBottomSheetSetting = async () => {
        console.log(selec, budg);
        await setChecked(selec);
        await setSelectedBudget(budg);

        setSaved(true);
    }


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={false}
            keyboardOpeningTime={0}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ flex: 1, padding: 30 }}> 
                <Text style={styles.title}>오늘의 예산 · 카테고리</Text>

                {/* 예산 */}
                <View style={{ marginVertical: 12 }}>
                    <Text style={styles.subTitle}>한 끼 예산</Text>
                    <TextInput
                        keyboardType="number-pad"
                        placeholder={`가격을 입력하세요. (추천 예산: ${formatPrice3(recBudget)})`}
                        defaultValue={(selectedBudget && selectedBudget != 0) ? selectedBudget : ""}
                        style={styles.input}
                        onChangeText={text => {
                            setbudg(text);
                            setSaved(false);
                        }}
                        inputAccessoryViewID={Platform.OS === "ios" ? "budgetInputID" : undefined}
                    />
                </View>

                <View style={{ padding: 10 }}></View>

                {/* 음식 카테고리 */}
                <View>
                    <Text style={styles.subTitle}>카테고리</Text>
                    <View style={styles.tagContainer}>
                        {FoodCategory.map((item) => {
                            const isChecked = selec.includes(item.label);
                            return (
                                <Pressable
                                    key={item.label}
                                    style={[
                                        styles.tag,
                                        isChecked && styles.tagSelected
                                    ]}
                                    onPress={() => {
                                        toggle(item.label);
                                        setSaved(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        isChecked && styles.tagSelectedText
                                    ]}>
                                        #{item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <Pressable
                    onPress={handleBottomSheetSetting}
                    style={{
                        width: "100%",
                        backgroundColor: saved ? colors.primary : "white",
                        borderColor: colors.primary,
                        borderRadius: 10,
                        borderWidth: 1,
                        paddingVertical: 13,
                        marginTop: 30
                    }}
                >
                    <Text
                        style={{
                            color: saved ? "white" : colors.primary,
                            fontWeight: "30",
                            fontSize: 20,
                            textAlign: "center"
                        }}>
                        설정 완료
                    </Text>
                </Pressable>
            </View>


            {/* iOS 전용 키보드 닫기 버튼 */}
            {Platform.OS === "ios" && (
                <InputAccessoryView nativeID="budgetInputID">
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
        </KeyboardAwareScrollView>
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
        marginTop: 8,
        color: "black",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center"
    },
    tag: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
    },
    tagText: {
        fontSize: 15,
        color: "#333"
    },
    tagSelected: {
        backgroundColor: colors.primary,
        borderWidth: 0,
    },
    tagSelectedText: {
        color: "#fff",
        fontWeight: "bold"
    }
});