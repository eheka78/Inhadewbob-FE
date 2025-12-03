import { View } from "react-native";
import React from "react";
import MealItem from "./MealItem";


export default function MealList({ dayMealList }) {
    return (
        <View>
            {dayMealList.length > 0 && dayMealList.map((item) => {
                return (
                    <MealItem key={item.id} item={item} />
                );
            })}
        </View>
    );
}