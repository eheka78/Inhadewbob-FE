import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

import RouletteMachine from '../components/RouletteMachine';
import BudgetCategoryBottomSheet from '../components/BudgetCategoryBottomSheet';
import FoodList from '../components/FoodList';

export default function Roulette() {
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['65%'], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const [foodList, setFoodList] = useState([]);

	// BudgetCategoryBottomSheet 에서 예산, 카테고리 설정 변수 
	const [ selectedBudget, setSelectedBudget ] = useState('');
	const [checked, setChecked] = useState([]);


	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.innerContainer}>
					<Text style={styles.title}>Roulette</Text>
					<RouletteMachine handlePresentModalPress={handlePresentModalPress} />
				</View>

				{/* { foodList && foodList.length() > 0 && <></>} */}
				<FoodList />

				<BottomSheetModal
					ref={bottomSheetModalRef}
				>
					<BottomSheetView>
						<SafeAreaView edges={["bottom"]}>
							<View>
								<BudgetCategoryBottomSheet setSelectedBudget={setSelectedBudget} checked={checked} setChecked={setChecked} />
							</View>
						</SafeAreaView>
					</BottomSheetView>
				</BottomSheetModal>
			</SafeAreaView>
		</BottomSheetModalProvider>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	innerContainer: {
		flex: 1, justifyContent: 'center', alignItems: 'center'
	},
	title: { fontSize: 24, marginBottom: 20 },
	sheetContent: {
		flex: 1, alignItems: 'center', justifyContent: 'center'
	}
});
