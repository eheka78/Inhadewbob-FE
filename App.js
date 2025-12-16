import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Login from "./app/screens/Login";
import BottomTab from "./app/components/BottomTab";
import InitialSetting from "./app/screens/InitialSetting";
import FrontPage from "./app/screens/FrontPage";
import OnboardingPage from "./app/screens/OnboardingPage";


const Stack = createNativeStackNavigator();


// LaunchScreen: 최상위에서 실행 체크
function LaunchScreen({ navigation }) {
    useEffect(() => {
        console.log("APP START!");
        navigation.replace("FrontPage");
    }, []);


    // 로딩 화면
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}


export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="Launch"
                    >
                        <Stack.Screen
                            name="Launch"
                            component={LaunchScreen}
                        />
                        <Stack.Screen
                            name="OnboardingPage"
                            component={OnboardingPage}
                        />
                        <Stack.Screen
                            name="Main"
                            component={BottomTab}
                        />
                        <Stack.Screen
                            name="FrontPage"
                            component={FrontPage}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            name="InitialSetting"
                            component={InitialSetting}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}