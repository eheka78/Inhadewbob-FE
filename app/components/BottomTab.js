import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text} from 'react-native';
import Home from '../screens/Home';
import MealLog from '../screens/MealLog';
import MyPage from '../screens/MyPage';

const Tab = createBottomTabNavigator();

function BottomTab({navigation}) {
    console.log(navigation);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fb8c00',
                tabBarShowLabel: true,
                tabBarIcon: () => null,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: '홈',
                }}
            />
            <Tab.Screen
                name="MealLog"
                component={MealLog}
                options={{
                    title: '식사 기록',
                }}
                // 로그인 안 되어 있으면 로그인 페이지로
                // listeners={({ navigation }) => ({
                //     tabPress: (e) => {
                //         e.preventDefault();
                //         navigation.navigate("Login");
                //     },
                // })}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    title: '마이페이지',
                }}
                // 로그인 안 되어 있으면 로그인 페이지로
                // listeners={({ navigation }) => ({
                //     tabPress: (e) => {
                //         e.preventDefault();
                //         navigation.navigate("Login");
                //     },
                // })}
            />
        </Tab.Navigator>
    );
}


export default BottomTab;