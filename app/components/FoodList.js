import { Pressable, Text, View } from "react-native";
import FoodItem from "./FoodItem";
import { useEffect, useState } from "react";


const mealBudget = [
    { id: 1, store: "KFC", menu: "징거세트", price: "7900", category: "패스트푸드" },
    { id: 2, store: "KFC", menu: "징거세트", price: "7900", category: "패스트푸드" },
    { id: 3, store: "KFC", menu: "징거세트", price: "7900", category: "패스트푸드" },
    { id: 4, store: "KFC", menu: "징거세트", price: "7900", category: "패스트푸드" },
];

const mealSave = [
    { id: 5, store: "KFC", menu: "불고기 버거", price: "6600", category: "패스트푸드" },
    { id: 6, store: "KFC", menu: "불고기 버거", price: "6600", category: "패스트푸드" },
];

const mealUse = [
    { id: 7, store: "KFC", menu: "징거타워", price: "8600", category: "패스트푸드" },
    { id: 8, store: "KFC", menu: "징거타워", price: "8600", category: "패스트푸드" },
];


export default function FoodList() {
    const [recommendType, setRecommendType] = useState("예산");  // 예산, 알뜰, 든든

    useEffect(() => {
        console.log(recommendType);
    }, [recommendType]);
    return (
        <View>
            <View>
                <Text>오늘의 추천 메뉴</Text>
            </View>

            {/* 추천 메뉴 종류 버튼 (예산, 알뜰, 든든) */}
            <View>
                <Pressable onPress={() => { setRecommendType('예산') }}>
                    <Text>예산 메뉴</Text>
                </Pressable>
                <Pressable onPress={() => { setRecommendType('알뜰') }}>
                    <Text>알뜰 메뉴</Text>
                </Pressable>
                <Pressable onPress={() => { setRecommendType('든든') }}>
                    <Text>든든 메뉴</Text>
                </Pressable>
            </View>

            {/* 추천 메뉴 리스트 출력 */}
            <View>
                {recommendType === "예산" &&
                    (mealBudget.map((item) => {
                        return (
                            <FoodItem key={item.id} item={item} />
                        );
                    }))
                }
                {recommendType === "알뜰" &&
                    (mealSave.map((item) => {
                        return (
                            <FoodItem key={item.id} item={item} />
                        );
                    }))
                }
                {recommendType === "든든" &&
                    (mealUse.map((item) => {
                        return (
                            <FoodItem key={item.id} item={item} />
                        );
                    }))
                }
            </View>
        </View>
    );
}