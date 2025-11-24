import { Pressable, Text, View } from "react-native";
import FoodItem from "./FoodItem";
import { useEffect, useState } from "react";


const mealList = [
    { id: 1, store: "KFC", menu: "징거세트1", price: "7900", category: "패스트푸드" },
    { id: 2, store: "KFC", menu: "징거세트2", price: "7900", category: "패스트푸드" },
    { id: 3, store: "KFC", menu: "징거세트3", price: "7900", category: "패스트푸드" },
    { id: 4, store: "KFC", menu: "징거세트4", price: "7900", category: "패스트푸드" },
    { id: 5, store: "KFC", menu: "징거세트5", price: "7900", category: "패스트푸드" },
];


export default function RecentFoodList() {
    const [recommendType, setRecommendType] = useState("예산");  // 예산, 알뜰, 든든

    useEffect(() => {
        console.log(recommendType);
    }, [recommendType]);

    return (
        <View>
            {/* 추천 메뉴 리스트 출력 */}
            <View>
                {mealList.map((item) => {
                    return (
                        <FoodItem key={item.id} item={item}/>
                    );
                })}
            </View>
        </View>
    );
}