import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
    console.log(navigation);
    return (
        <SafeAreaView> 
            <View>
                <Text>Home</Text>
                <Button
                    title="로그인 페이지로 이동"
                    onPress={() => navigation.getParent().navigate("Login")}
                />
            </View>
        </SafeAreaView>
    );
}
