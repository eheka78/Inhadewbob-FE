import React, { useState, useRef } from 'react';
import {Text, View, StyleSheet, Button, ScrollView, Pressable} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import RouletteMachine from '../components/RouletteMachine';
import FoodList from '../components/FoodList';

export default function Roulette({ handlePresentModalPress }) {
    const [recFoodList, setRecFoodList] = useState([]);

    const scrollRef = useRef();

    // FoodList 영역 위치 저장
    const [foodListY, setFoodListY]= useState(0);

    const pressScrollTab = () => {
        console.log(foodListY);
        // scrollRef.current.scrollTo({ y: foodListY, animated: true });
        scrollRef.current.scrollToEnd({ animated: true });
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView ref={scrollRef} >
                    <View style={{ margin: "auto", width: "90%", }}>
                        {/* 룰렛 머신 */}
                        <View style={styles.innerContainer}>
                            <RouletteMachine handlePresentModalPress={handlePresentModalPress} />
                        </View>


                        {/* 룰렛에서 뽑은 메뉴 리스트 출력 */}
                        <View
                            onLayout={(event) => {
                                setFoodListY(event.nativeEvent.layout.y);
                            }}
                        >
                            {/* { recFoodList && recFoodList.length() > 0 && <FoodList /> */}
                            <FoodList />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: "white",
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	title: {
		fontSize: 24,
		marginBottom: 20
	},
	sheetContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
