import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { useEffect } from 'react';


export default function OnboardingPage({ navigation }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Main");
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
