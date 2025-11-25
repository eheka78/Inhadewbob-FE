import {Button, Image, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";

export default function FrontPage({ navigation }) {
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
        height: 80,
    }
});
