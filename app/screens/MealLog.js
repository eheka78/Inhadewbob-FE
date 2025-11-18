import { Button, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CalendarForm from '../components/Calendar';

export default function MealLog({ navigation }) {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor:"white" }}> 
				<View>
					<Text>MealLog</Text>
					<CalendarForm></CalendarForm>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
