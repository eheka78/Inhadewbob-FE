import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StyleSheet} from 'react-native';
import HomePage from '../screens/HomePage';
import MealLog from '../screens/MealLog';
import MyPage from '../screens/MyPage';

const Tab = createBottomTabNavigator();
const LOGO = '../../assets/LOGO2.png';


function BottomTab({navigation}) {

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