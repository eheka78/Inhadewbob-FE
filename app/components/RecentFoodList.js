import { Pressable, Text, View } from "react-native";
import FoodItem from "./FoodItem";
import { useEffect, useState } from "react";
import { loadAccessToken } from "../../tokenStorage";
import RecentFoodItem from "./RecentFoodItem";
import { getLatest } from "../api/dietLog";


const BACKEND_URL = "https://inha-dewbob.p-e.kr";


export default function RecentFoodList({mealList}) {

    return (
        <View>
            {/* 추천 메뉴 리스트 출력 */}
            <View>
                {mealList.map((item) => {
                    return (
                        <RecentFoodItem key={item.id} item={item} />
                    );
                })}
            </View>
        </View>
    );
}