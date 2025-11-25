import React from "react";
import { View } from "react-native";
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
            }}
        >
            {/* 위쪽 흰색 */}
            <View
                style={{
                    width: size,
                    height: size / 2,
                    backgroundColor: "#ffffff",
                }}
            />
            {/* 중앙 라인 */}
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
            {/* 아래쪽 테마색 */}
            <View
                style={{
                    width: size,
                    height: size / 2,
                    backgroundColor: RouletteColors.sub,
                    position: "absolute",
                    bottom: 0,
                }}
            />
        </View>
    );
}
