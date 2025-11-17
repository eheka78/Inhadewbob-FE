import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text, Image} from 'react-native';
import HomePage from '../screens/HomePage';
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
                name="HomePage"
                component={HomePage}
                options={{
                    headerTitle: () => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                        source={require('../../assets/LOGO.png')}
                        style={{ width: 100, height: 40 }}
                        resizeMode="contain"
                        />
                    </View>
                    ),
                    headerTitleAlign: 'center',
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