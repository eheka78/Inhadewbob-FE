import React, { useState } from 'react';
import { Button, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './Home.js';
import Roulette from './Roulette.js';

export default function HomePage({ navigation }) {
    const [showRoulette, setShowRoulette] = useState(false);  // false: 홈, true: 룰렛

    return (
        <SafeAreaView style={{ backgroundColor:"white"}}> 
            {/* 홈, 룰렛 토글 버튼 */}
            <Button
                title={showRoulette ? "홈" : "룰렛"}
                onPress={() => setShowRoulette(prev => !prev)}
            />

            {/* 홈, 룰렛 페이지 import */}
            {showRoulette ? <Home /> : <Roulette />}
            
            <Button
                title="로그인 페이지로 이동"
                onPress={() => navigation.getParent().navigate("Login")}
            />
        </SafeAreaView>
    );
}
