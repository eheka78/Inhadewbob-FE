import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StyleSheet} from 'react-native';
import Home from '../screens/Home';
import MealLog from '../screens/MealLog';
import MyPage from '../screens/MyPage';
import Setting from '../screens/Setting';
import Roulette from "../screens/Roulette";
import {colors} from "../constants/colors";

const Tab = createBottomTabNavigator();
const LOGO = '../../assets/LOGO2.png';


function BottomTab({navigation}) {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarShowLabel: true,
                tabBarIcon: () => null,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/home-tab.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? colors.primary : colors.graphSubColor,
                            }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitle: () => (
                    <View style={styles.logoContainer}>
                        <Image
                            source={require(LOGO)}
                            style={styles.logoImg}
                            resizeMode="contain"
                        />
                    </View>
                    ),
                    headerTitleAlign: 'center',
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
                name="Roulette"
                component={Roulette}
                options={{
                    tabBarLabel: '를렛',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/roulette-tab.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? colors.primary : colors.graphSubColor,
                            }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitle: () => (
                        <View style={styles.logoContainer}>
                            <Image
                                source={require(LOGO)}
                                style={styles.logoImg}
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
                    tabBarLabel: '식단 기록',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/calendar-tab.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? colors.primary : colors.graphSubColor,
                            }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitle: () => (
                    <View style={styles.logoContainer}>
                        <Image
                            source={require(LOGO)}
                            style={styles.logoImg}
                            resizeMode="contain"
                        />
                    </View>
                    ),
                    headerTitleAlign: 'center',
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
                    tabBarLabel: '마이',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/my-tab.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? colors.primary : colors.graphSubColor,
                            }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitle: () => (
                    <View style={styles.logoContainer}>
                        <Image
                            source={require(LOGO)}
                            style={styles.logoImg}
                            resizeMode="contain"
                        />
                    </View>
                    ),
                    headerTitleAlign: 'center',
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



const styles = StyleSheet.create({
    logoContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    logoImg: {
        height: 35
    }
});

export default BottomTab;