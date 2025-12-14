import { StyleSheet, View } from "react-native";
import React from "react";
import MealItem from "./MealItem";


export default function MealList({ dailyMealList }) {
    console.log(dailyMealList);
    return (
        <View style={styles.container}>
            {dailyMealList && dailyMealList.map((item) => {
                return (
                    <MealItem key={item.id} item={item} />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    }
});