import { Pressable, Text, View } from "react-native";
import FoodItem from "./FoodItem";
import { useEffect, useState } from "react";
import { loadAccessToken } from "../../tokenStorage";
import axios from "axios";


const BACKEND_URL = "https://inha-dewbob.p-e.kr";


export default function RecentFoodList() {
    let mealList = [];

    useEffect(async () => {

        const loadAccessTokened = await loadAccessToken();
        console.log("Loaded Access Token in Home:", loadAccessTokened);

        // 최근 식단 기록 조회 5개
        // 소비 통계 조회
        try {
            const res = await axios.get(`${BACKEND_URL}/diets/latest`, {
                headers: {
                    Authorization: `Bearer ${loadAccessTokened}`,
                },
            });

            console.log("getLatest 조회 성공: ", res.data);

            console.log("getLatest res: ");
            console.log(res);

            console.log("mealList: ");
            console.log(mealList);

            mealList = mealList.map((item, i) => ({
                ...item,
                id: i,
                store: res[i].restaurantName,
                menu: res[i].menuName,
                price: res[i].price
            }));

        } catch (e) {
            console.error("getLatest 실패: ", e);
        }
    }, [])

    return (
        <View>
            {/* 추천 메뉴 리스트 출력 */}
            <View>
                {mealList.map((item) => {
                    return (
                        <FoodItem key={item.id} item={item} />
                    );
                })}
            </View>
        </View>
    );
}