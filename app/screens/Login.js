import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
    return (
        <SafeAreaView> 
            <View>
                <Text>Login</Text>
                <Button
                    title="로그인"
                    onPress={() => navigation.navigate("Main")}
                />
            </View>
        </SafeAreaView>
    );
}
