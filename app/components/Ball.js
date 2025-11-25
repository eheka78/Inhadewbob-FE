import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RouletteColors } from "../constants/colors";


export default function Ball({ size = 50 }) {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: RouletteColors.btnBorder,
            }}
        >
            <LinearGradient
                colors={["rgba(255,255,255,1)", RouletteColors.main ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 1, borderRadius: size / 2 }}
            />
        </View>
    );
}
