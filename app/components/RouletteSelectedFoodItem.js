import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
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
        paddingVertical: 6,   // ⬅️ 얇게
    },

    card: {
        backgroundColor: "white",
        borderRadius: 12,     // ⬅️ 둥글기 감소
        paddingVertical: 10,  // ⬅️ 핵심
        paddingHorizontal: 14,
        shadowColor: "#000",
        shadowOpacity: 0.06,  // ⬅️ 그림자 최소
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuName: {
        fontSize: 14,
        fontWeight: "600",
    },

    restaurant: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },

    price: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: colors.primary,
    },

    iconRow: {
        flexDirection: "row",
        marginLeft: 8,
    },

    icon: {
        width: 18,
        height: 18,
        tintColor: "#444",
        marginLeft: 8,
    },
});
