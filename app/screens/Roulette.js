import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import BudgetCategoryBottomSheet from '../components/BudgetCategoryBottomSheet.js';


import RouletteMachine from '../components/RouletteMachine';
import FoodList from '../components/FoodList';
import { getRecommendPrice } from '../api/menu.js';

export default function Roulette() {
    const [recFoodList, setRecFoodList] = useState([]);
    const [recBudget, setRecBudget] = useState(0);

    const scrollRef = useRef();

    // FoodList 영역 위치 저장
    const [foodListY, setFoodListY] = useState(0);

    const pressScrollTab = () => {
        console.log(foodListY);
        // scrollRef.current.scrollTo({ y: foodListY, animated: true });
        scrollRef.current.scrollToEnd({ animated: true });
    }

    // bottomSheet 관련
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['65%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    // BudgetCategoryBottomSheet 에서 예산, 카테고리 설정 변수
    const [selectedBudget, setSelectedBudget] = useState('');
    const [checked, setChecked] = useState([]);

    useEffect(async () => {
        // 추천 예산 받아오는 api
        await setRecBudget(await getRecommendPrice());
    }, []);

    // log
    useEffect(() => {
        console.log("selectedBudget: " + selectedBudget);
    }, [selectedBudget]);
    useEffect(() => {
        console.log("checked: " + checked);
    }, [checked]);
    useEffect(() => {
        console.log("recBudget: ");
        console.log(recBudget);
    }, [recBudget]);
    useEffect(() => {
        console.log("recFoodList: " + recFoodList);
    }, [recFoodList]);


    return (
        <BottomSheetModalProvider>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    {/* RouletteMachine.js에서 '이동' 버튼 눌렀을 때 - 카테고리, 예산을 선택하는 BottomSheet */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                    >
                        <BottomSheetView>
                            <View>
                                <BudgetCategoryBottomSheet
                                    selectedBudget={selectedBudget}
                                    setSelectedBudget={setSelectedBudget}
                                    checked={checked}
                                    setChecked={setChecked}
                                    recBudget={recBudget}
                                />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    <ScrollView ref={scrollRef} >
                        <View style={{ margin: "auto", width: "90%", }}>
                            {/* 룰렛 머신 */}
                            <View style={styles.innerContainer}>
                                <RouletteMachine
                                    handlePresentModalPress={handlePresentModalPress}
                                    selectedBudget={selectedBudget}
                                    checked={checked}
                                    recBudget={recBudget}
                                />
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
        </BottomSheetModalProvider>
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
