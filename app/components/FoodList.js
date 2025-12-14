import { Pressable, StyleSheet, Text, View } from "react-native";
import FoodItem from "./FoodItem";
import { useEffect, useState } from "react";
import { colors } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function FoodList({ recFoodList }) {
    const navigation = useNavigation();
    const [recommendType, setRecommendType] = useState("예산");
    const [selectedMenu, setSelectedMenu] = useState([]);


    const saveTempMeal = async (meal) => {
        const prev = await AsyncStorage.getItem("tempMeals");
        const list = prev ? JSON.parse(prev) : [];

        list.unshift(meal);

        await AsyncStorage.setItem("tempMeals", JSON.stringify(list));
    };

    const saveDietLog = async () => {
        console.log("selectedMenu: " + selectedMenu);
        if (!selectedMenu) {
            console.log("메뉴를 선택하세요");
            return;
        }

        await saveTempMeal(selectedMenu);

        navigation.navigate('Home');
    };

    const renderTypeButton = (type) => {
        const isActive = recommendType === type;

        return (
            <Pressable
                onPress={() => setRecommendType(type)}
                style={[
                    styles.typeBtn,
                    isActive && styles.typeBtnActive,
                ]}
            >
                <Text
                    style={[
                        styles.typeBtnText,
                        isActive && styles.typeBtnTextActive,
                    ]}
                >
                    {type}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>오늘의 추천 메뉴</Text>

            {/* 예산 / 알뜰 / 든든 버튼 */}
            <View style={styles.typeBtnWrapper}>
                {renderTypeButton("예산")}
                {renderTypeButton("알뜰")}
                {renderTypeButton("든든")}
            </View>

            {/* 메뉴 리스트 */}
            <View>
                {/* 예산 */}
                {recommendType === "예산" &&
                    recFoodList.rouletteResponses.map((item) => (
                        <FoodItem
                            key={item.menuId}
                            item={item}
                            setSelectedMenu={setSelectedMenu}
                            selectedMenu={selectedMenu}
                        />
                    ))
                }
                {recommendType === "예산" &&
                    recFoodList?.rouletteResponses?.length < 1 && (
                        <View>
                            <Text>존재하지 않습니다.</Text>
                        </View>
                    )
                }

                {/* 알뜰 */}
                {recommendType === "알뜰" &&
                    recFoodList.aroundDownResponses.map((item) => (
                        <FoodItem
                            key={item.menuId}
                            item={item}
                            setSelectedMenu={setSelectedMenu}
                            selectedMenu={selectedMenu}
                        />
                    ))
                }
                {recommendType === "알뜰" &&
                    recFoodList?.aroundDownResponses?.length < 1 && (
                        <View>
                            <Text>존재하지 않습니다.</Text>
                        </View>
                    )
                }

                {/* 든든 */}
                {recommendType === "든든" &&
                    recFoodList.aroundUpResponses.map((item) => (
                        <FoodItem
                            key={item.menuId}
                            item={item}
                            setSelectedMenu={setSelectedMenu}
                            selectedMenu={selectedMenu}
                        />
                    ))
                }
                {recommendType === "든든" &&
                    recFoodList?.aroundUpResponses?.length < 1 && (
                        <View>
                            <Text>존재하지 않습니다.</Text>
                        </View>
                    )
                }
            </View>

            {/* 식단으로 저장하기 */}
            <Pressable
                onPress={saveDietLog}
                disabled={!selectedMenu}
                style={[
                    styles.saveBtn,
                    !selectedMenu && styles.saveBtnDisabled,
                ]}
            >
                <Text style={styles.saveBtnText}>
                    식단으로 저장하기
                </Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 15,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },

    /* 예산 / 알뜰 / 든든 */
    typeBtnWrapper: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 10,
    },

    typeBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#EEF2F7",
        alignItems: "center",
    },

    typeBtnActive: {
        backgroundColor: colors.primary, // 파란색
    },

    typeBtnText: {
        fontSize: 14,
        color: "#555",
        fontWeight: "600",
    },

    typeBtnTextActive: {
        color: "white",
    },

    /* 저장 버튼 */
    saveBtn: {
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: "center",
    },

    saveBtnDisabled: {
        backgroundColor: "#C7D4F7",
    },

    saveBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
