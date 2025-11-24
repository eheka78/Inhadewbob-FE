import {Button, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useState} from "react";

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
                            <Text style={styles.text}>환영합니다,</Text>
                            <Text style={styles.text}>주간 식비를 입력해주세요</Text>
                        </View>
                        <View style={{borderColor:"black", borderRadius:15, borderWidth:1, width:"80%"}}>
                            <TextInput style={{textAlign:"center"}}></TextInput>
                        </View>
                    </>
                }

                {Q === 2 &&
                    <>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>주별 외식 횟수는 몇 번인가요?</Text>
                        </View>
                        <View style={{borderColor:"black", borderRadius:15, borderWidth:1, width:"80%"}}>
                            <TextInput style={{textAlign:"center"}}></TextInput>
                        </View>
                    </>
                }

                <View>
                    {Q === 2 &&
                        <Pressable onPress={() => setQ(1)}>
                            <Text>이전</Text>
                        </Pressable>
                    }

                    <Pressable onPress={() => setQ(2)}>
                        <Text>다음</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    logoImg: {
        height: 80,
    },
    textContainer: {
        textAlign: "center",
        margin:10,
    },
    text: {
        textAlign: "center",
        fontSize: 18
    }
});
