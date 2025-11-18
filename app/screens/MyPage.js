import { Button, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function MyPage({ navigation }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor:"white" }}> 
                <View>
                    <Text>MyPage</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
