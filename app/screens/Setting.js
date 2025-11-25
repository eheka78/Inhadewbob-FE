import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

export default function Setting({ navigation }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View>
                    <Text>Setting</Text>
                </View>
                <View style={{ width: "100%", padding: 30, }}>
                    <Pressable
                        onPress={() => {
                            console.log("로그아웃");
                            // 로그아웃 api
                            navigation.getParent().navigate("Login");   // 로그인 페이지로 이동
                        }}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>로그아웃</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            console.log("탈퇴하기");
                            // 탈퇴 api
                            navigation.getParent().navigate("Login");   // 로그인 페이지로 이동
                        }}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>탈퇴하기</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
    btn: {
        width: "100%",
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
        marginVertical: 10,
        borderRadius: 10,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        paddingVertical: 10,
    },
});

