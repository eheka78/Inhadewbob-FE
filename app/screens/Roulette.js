import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RouletteMachine from '../components/RouletteMachine';
import FoodList from '../components/FoodList';


export default function Roulette({ handlePresentModalPress }) {
	const [foodList, setFoodList] = useState([]);


	return (
		<SafeAreaView style={styles.container}>
			{/* 룰렛 머신 */}
			<View style={styles.innerContainer}>
				<RouletteMachine handlePresentModalPress={handlePresentModalPress} />
			</View>

			{/* 룰렛에서 뽑은 메뉴 리스트 출력 */}
			{/* { foodList && foodList.length() > 0 && <FoodList /> */}
			<FoodList />
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		marginBottom: 20
	},
	sheetContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
