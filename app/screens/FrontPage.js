import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { useEffect } from 'react';


export default function FrontPage({ navigation }) {

    const checkFirstLaunch = async () => {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched) {
                // 이미 실행한 적 있으면 Login으로
                navigation.replace("Login");
            } else {
                // 처음 실행이면 저장 후 5초 뒤 InitialSetting으로
                await AsyncStorage.setItem('hasLaunched', 'true');
                setTimeout(() => {
                    // 온보딩 페이지 만들어지면 온보딩 화면으로 변경해야함
                    navigation.replace("InitialSetting");
                }, 3000);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            checkFirstLaunch();
        }, 3000);   // 3초 후에 이동

        return () => clearTimeout(timer);
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/LOGO.png')}
                    style={styles.logoImg}
                    resizeMode="contain"
                />
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
        height: 65,
    }
});
