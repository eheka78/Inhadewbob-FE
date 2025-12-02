import { Button, Image, InputAccessoryView, Platform, Pressable, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react";
import { colors } from '../constants/colors';
import { loadAccessToken } from '../../tokenStorage';
import axios from 'axios';

export default function InitialSetting({ navigation }) {
    console.log("InitialSetting Screen Loaded");
    const [Q, setQ] = useState(1); // 1, 2

    const [weeklyMealBudget, setWeeklyMealBudget] = useState('');
    const [weeklyDiningOutCount, setWeeklyDiningOutCount] = useState('');

    useEffect(() => {
        console.log("Initial Setting - Weekly Meal Budget:", weeklyMealBudget);
        console.log("Initial Setting - Weekly Dining Out Count:", weeklyDiningOutCount);
    }, [weeklyMealBudget, weeklyDiningOutCount]);

    const updateProfile = async () => {
        try {
            // 저장된 AccessToken 불러오기
            const accessToken = await loadAccessToken();
            console.log("Loaded Access Token:", accessToken);

            // PATCH 요청
            const res = await axios.patch(
                `https://inha-dewbob.p-e.kr/auth/profile`,
                {
                    weeklyBudget: parseInt(weeklyMealBudget, 10),
                    eatoutCount: parseInt(weeklyDiningOutCount, 10)
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );


            console.log("Profile updated:", res.data);
            navigation.navigate("Main");
        } catch (error) {
            console.error("Profile update error:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/LOGO.png')}
                    style={styles.logoImg}
                    resizeMode="contain"
                />
                {Q === 1 &&
                    <>
                        <View style={styles.textContainer}>
                            <Text style={styles.qText}>
                                환영합니다,{"\n"}
                                주간 식비를 입력해주세요
                            </Text>
                        </View>
                        <View style={{ borderColor: "black", borderRadius: 15, borderWidth: 1, width: "80%" }}>
                            <TextInput
                                keyboardType="number-pad"
                                inputAccessoryViewID={Platform.OS === "ios" ? "InputID" : undefined}
                                style={{ textAlign: "center", paddingVertical: 10, }}
                                value={weeklyMealBudget}
                                onChangeText={setWeeklyMealBudget}
                            />
                        </View>
                    </>
                }

                {Q === 2 &&
                    <>
                        <View style={styles.textContainer}>
                            <Text style={styles.qText}>주별 외식 횟수는 몇 번인가요?</Text>
                        </View>
                        <View style={{ borderColor: "black", borderRadius: 15, borderWidth: 1, width: "80%" }}>
                            <TextInput
                                keyboardType="number-pad"
                                inputAccessoryViewID={Platform.OS === "ios" ? "InputID" : undefined}
                                style={{ textAlign: "center", paddingVertical: 10, }}
                                onChangeText={setWeeklyDiningOutCount}
                                value={weeklyDiningOutCount}
                            />
                        </View>
                    </>
                }

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
                            <Pressable
                                onPress={() => {
                                    const currentlyFocusedField = TextInput.State.currentlyFocusedInput();
                                    if (currentlyFocusedField) {
                                        Keyboard.dismiss();
                                    }
                                }}
                            >
                                <Text style={{ fontSize: 16, color: colors.primary }}>완료</Text>
                            </Pressable>
                        </View>
                    </InputAccessoryView>
                )}

            </View>



            {/* 이전, 다음으로 넘기는 버튼 */}
            <View>
                {Q === 2 &&
                    <Pressable
                        onPress={() => setQ(1)}
                        style={[styles.btn, { left: 20 }]}
                    >
                        <Text style={[styles.btnTxt]}>이전</Text>
                    </Pressable>
                }

                <Pressable
                    onPress={() => {
                        if (Q == 1) setQ(2);
                        if (Q == 2) {
                            updateProfile();
                        }
                    }}
                    style={[styles.btn, { right: 20 }]}
                >
                    <View>
                        <Text style={[styles.btnTxt]}>
                            {Q == 2 ? '저장' : '다음'}
                        </Text>
                    </View>
                </Pressable>
            </View>


            <Button
                title="Home"
                onPress={() => navigation.navigate("Main")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        width: "100%",
        height: "100%",
        paddingBottom: "100",   // 키보드 영역때문에 위로 올림
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    logoImg: {
        height: 65,
    },
    textContainer: {
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    qText: {
        textAlign: "center",
        fontSize: 18,
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        width: "30%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        borderRadius: 50,
    },
    btnTxt: {
        textAlign: "center",
        color: "white"
    }
});
