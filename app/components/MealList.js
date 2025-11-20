import { View } from "react-native";
import React from "react";
import MealItem from "./MealItem";


const dayMealList = [
    { id: 1, store: "Rolling Pasta", menu: "봉골레 파스타", price: "6000", category: "양식", t: "08:30" },
    { id: 2, store: "KFC", menu: "징거세트", price: "7900", category: "패스트푸드", t: "13:30" },
    { id: 3, store: "Rolling Pasta", menu: "봉골레 파스타", price: "6000", category: "양식", t: "20:30" },
];


export default function MealList() {
    return (
        <View>
            {dayMealList.map((item) => {
                return (
                    <MealItem key={item.id} item={item} />
                );
            })}
        </View>
    );
}