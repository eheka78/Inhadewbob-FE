import { Button, Image, InputAccessoryView, Platform, Pressable, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import { colors } from '../constants/colors';

export default function InitialSetting({ navigation }) {
    const [Q, setQ] = useState(1); // 1, 2

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
                        if (Q == 2) navigation.navigate("Login");
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
