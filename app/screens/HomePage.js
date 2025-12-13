import React, { useCallback, useRef, useState } from 'react';
import {View, ScrollView, Button} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './Home.js';
import Roulette from './Roulette.js';
import Toggle from '../components/Toggle.js';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import BudgetCategoryBottomSheet from '../components/BudgetCategoryBottomSheet.js';


export default function HomePage({ navigation }) {
    const [homeType, setHomeType] = useState("홈");  // 페이지 토글 | 홈, 룰렛


    // bottomSheet 관련 
    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    // BudgetCategoryBottomSheet 에서 예산, 카테고리 설정 변수 
    const [selectedBudget, setSelectedBudget] = useState('');
    const [checked, setChecked] = useState([]);


    return (
        <BottomSheetModalProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    {/* RouletteMachine.js에서 '이동' 버튼 눌렀을 때 - 카테고리, 예산을 선택하는 BottomSheet */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                    >
                        <BottomSheetView>
                            <View>
                                <BudgetCategoryBottomSheet selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} checked={checked} setChecked={setChecked} />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>


                    {/* 홈, 룰렛 토글 버튼 */}
                    <View style={{ position: "absolute", paddingTop: 15, width: "100%", zIndex: 10 }}>
                        <Toggle
                            leftLabel="홈"
                            rightLabel="룰렛"
                            onToggle={(label) => setHomeType(label)}
                        />
                    </View>


                    <ScrollView
                        style={{ flex: 1 }}
                    >
                        <View style={{ height: 40 }} />
                        {/* 홈, 룰렛 페이지 import */}
                        {homeType === "홈" && <Home setHomeType={setHomeType} />}
                        {homeType === "룰렛" && <Roulette handlePresentModalPress={handlePresentModalPress} />}

                        <Button
                            title="로그인 페이지로 이동"
                            onPress={() => navigation.getParent().navigate("Login")}
                        />
                        <Button
                            title="초기 설정"
                            onPress={() => navigation.getParent().navigate("InitialSetting")}
                        />
                    </ScrollView>

                </SafeAreaView>
            </SafeAreaProvider>
        </BottomSheetModalProvider>
    );
}