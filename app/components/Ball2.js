import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RouletteColors } from "../constants/colors";


export default function Ball2({ size = 50, lineWidth = 2 }) {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: RouletteColors.btnBorder,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 5,
            }}
        >
            <View
                style={{
                    width: size,
                    height: size / 2,
                    backgroundColor: "#ffffff",
                }}
            />
            <View
                style={{
                    position: "absolute",
                    top: size / 2 - lineWidth / 2,
                    left: 0,
                    width: size,
                    height: lineWidth,
                    backgroundColor: RouletteColors.main,
                }}
            />

            <View
                style={{
                    width: size,
                    height: size / 2,
                    backgroundColor: RouletteColors.sub,
                    position: "absolute",
                    bottom: 0,
                }}
            />

            <LinearGradient
                colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]}
                start={{ x: 0.3, y: 0.3 }}
                end={{ x: 0.7, y: 0.7 }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }}
            />

            <View
                style={{
                    position: "absolute",
                    top: size * 0.2,
                    left: size * 0.2,
                    width: size * 0.15,
                    height: size * 0.15,
                    borderRadius: size / 2,
                    backgroundColor: "rgba(255,255,255,0.7)",
                }}
            />
        </View>
    );
}
