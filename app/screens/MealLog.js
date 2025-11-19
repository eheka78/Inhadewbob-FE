import { useEffect, useState } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Calendar from '../components/Calendar';
import WeeklyCalendar1 from '../components/WeeklyCalendar1';
import WeeklyCalendar2 from '../components/WeeklyCalendar2';
import { formatDateTime } from './../utils/FormatDateTime';
import MealList from '../components/MealList';


export default function MealLog({ navigation }) {
	const [selectedDate, setSelectedDate] = useState(new Date()); // 캘린더에서 선택한 날짜 | default = 오늘


	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView contentContainerStyle={{ padding: 16 }}>
					<Text>MealLog</Text>

					{/* 월간 캘린더 v1 */}
					<Calendar />

					{/* 주간 캘린더 v2 */}
					<WeeklyCalendar1 />

					{/* 주간 캘린더 v3 */}
					<WeeklyCalendar2 setSelectedDate={setSelectedDate} />

					{/* 선택한 날짜 - 식단 기록 view */}
					<View>
						<View>
							<Text>{formatDateTime(selectedDate)}</Text>
						</View>

						<MealList />
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
