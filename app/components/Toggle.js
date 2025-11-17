import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";


export default function Toggle({ leftLabel = "왼쪽", rightLabel = "오른쪽", onToggle }) {
    const [selected, setSelected] = useState(leftLabel);

    // animation 초기화
    const animation = useRef(new Animated.Value(0)).current;

    // 토클 눌렀을 때,
    const handlePress = (label) => {
        setSelected(label);
        if (onToggle) onToggle(label);

        // 토글 눌렀을 때, 애니메이션 실행
        Animated.timing(animation, {
            toValue: label === leftLabel ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };


    // 배경색 interpolate
    const leftBg = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["#8E8E93", "white"],
    });

    const rightBg = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["white", "#8E8E93"],
    });


    // 글자 색 interpolate
    const leftColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["white", "#8E8E93"],
    });

    const rightColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["#8E8E93", "white"],
    });


    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* 왼쪽 라벨 */}
                <TouchableOpacity onPress={() => handlePress(leftLabel)} style={{ flex: 1 }}>
                    <Animated.View style={[styles.tab, { backgroundColor: leftBg }]}>
                        <Animated.Text style={[styles.tabText, { color: leftColor }]}>
                            {leftLabel}
                        </Animated.Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* 오른쪽 라벨 */}
                <TouchableOpacity onPress={() => handlePress(rightLabel)} style={{ flex: 1 }}>
                    <Animated.View style={[styles.tab, { backgroundColor: rightBg }]}>
                        <Animated.Text style={[styles.tabText, { color: rightColor }]}>
                            {rightLabel}
                        </Animated.Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        width: "100%",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#8E8E93",
        borderRadius: 10,
        overflow: "hidden",
        width: 200,
        height: 35,
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabText: {
        fontWeight: "500",
    },
});
