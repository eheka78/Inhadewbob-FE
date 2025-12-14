import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, RouletteColors } from "../constants/colors";
import { formatPrice3 } from '../utils/FormatPrice3';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "../api/dietLog";
import { useEffect } from "react";


export default function RouletteSelectedFoodItem({ item, loadTempMeals }) {
    useEffect(() => {
        if (!item) return;

        console.log("item: ");
        console.log(item);
    }, [item]);


    const confirmMeal = async () => {
        console.log("item.menuId: " + item.menuId);
        await create(item.menuId); // 서버 저장

        const prev = await AsyncStorage.getItem("tempMeals");
        const list = JSON.parse(prev);

        const filtered = list.filter(m => m.createdAt !== item.createdAt);
        await AsyncStorage.setItem("tempMeals", JSON.stringify(filtered));

        loadTempMeals();
    };


    const removeTempMeal = async () => {
        const prev = await AsyncStorage.getItem("tempMeals");
        const list = JSON.parse(prev);
        
        const filtered = list.filter(m => m.createdAt !== item.createdAt);
        await AsyncStorage.setItem("tempMeals", JSON.stringify(filtered));
        
        console.log("삭제 누름");
        loadTempMeals();
    };


    return (
        <View style={styles.outerContainer}>
            <View style={styles.card}>
                <View style={styles.row}>
                    {/* 왼쪽 텍스트 */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.menuName} numberOfLines={1}>
                            {item.menuName}
                        </Text>
                        <Text style={styles.restaurant} numberOfLines={1}>
                            {item.restaurantName}
                        </Text>
                    </View>

                    {/* 가격 */}
                    <Text style={styles.price}>
                        {formatPrice3(item.price)}
                    </Text>

                    {/* 아이콘 */}
                    <View style={styles.iconRow}>
                        <Pressable
                            onPress={removeTempMeal}
                        >
                            <Image
                                source={require("../../assets/close.png")}
                                style={styles.icon}
                            />
                        </Pressable>
                        <Pressable
                            onPress={confirmMeal}
                        >
                            <Image
                                source={require("../../assets/check.png")}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    outerContainer: {
        width: "100%",
        paddingTop: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,

        // 🔵 블루 그림자 (iOS)
        shadowColor: "#4C7DFF",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,

        // 🔵 안드로이드
        elevation: 6,

        // 🔵 포인트 라인
        borderLeftWidth: 10,
        borderLeftColor: colors.primary,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#222",
    },

    restaurant: {
        fontSize: 12,
        color: "#7A7A7A",
        marginTop: 2,
    },

    price: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "700",
        color: colors.primary,
    },

    iconRow: {
        flexDirection: "row",
        marginLeft: 10,
    },

    icon: {
        width: 18,
        height: 18,
        tintColor: colors.primary,
        marginLeft: 10,
        opacity: 0.85,
    },
});
