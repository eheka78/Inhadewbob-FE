import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, Animated, Image, ScrollView } from 'react-native';
import RouletteMachineMovingBall from './RouletteMachingMovingBall';
import { RouletteColors } from '../constants/colors';
import { formatPrice3 } from './../utils/FormatPrice3';


const { width } = Dimensions.get("window");


export default function RouletteMachine({
	handlePresentModalPress,
	selectedBudget,
	checked,
	recBudget,
	setRecFoodList
}) {
	const spinAnim = useRef(new Animated.Value(0)).current;
	const [spinning, setSpinning] = useState(false);

	const spinOnce = () => {
		if (spinning) return;
		setSpinning(true);

		spinAnim.setValue(0);

		Animated.timing(spinAnim, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start(() => {
			setSpinning(false);
		});
	};

	const spin = spinAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});


	return (
		<View style={styles.container}>

			{/* 룰렛 머신 공 돌아가는 영역 */}
			<View style={styles.displayPanel}>
				<RouletteMachineMovingBall
					start={spinning}
					selectedBudget={selectedBudget}
					checked={checked}
					setRecFoodList={setRecFoodList}
					recBudget={recBudget}
				/>
				<View style={styles.highlightOverlay} />
			</View>

			{/* 오늘 예산 출력되는 패널 */}
			<View style={styles.panel}>
				<Image
					source={require('../../assets/money.png')}
					style={{ tintColor: "white", height: 25, width: 25, marginRight: 5 }}
					resizeMode="contain"
				/>
				<Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: 'center' }}>
					오늘의 추천 예산：<Text style={{ fontWeight: "bold" }}>{formatPrice3(recBudget)}</Text>
				</Text>
			</View>

			{/* 예산, 카테고리 선택 패널, 버튼 */}
			<View style={styles.panelRow}>
				<View style={styles.panel2}>
					{/* 선택한 사항(음식 카테고리, 선택 예산) 나오는 패널 */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ flex: 1, marginRight: 70 }} // 이동 버튼 공간 확보
					>
						<Text style={{ fontWeight: 'bold', fontSize: 15, color: "#bbb" }}>
							{((!selectedBudget || selectedBudget == 0) && (!checked || checked.length === 0))
								&& "예산과 카테고리 선택해듀"}
						</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>
							{(selectedBudget != 0 && selectedBudget) && `${formatPrice3(selectedBudget)}`}
							{(selectedBudget != 0 && checked.length != 0) && " / "}
							{(checked.length != 0 && checked) && `${checked.join(", ")}`}
						</Text>
					</ScrollView>

					{/* 이동 버튼 */}
					<Pressable
						onPress={handlePresentModalPress}
						style={({ pressed }) => [
							styles.moveBtn,
							pressed && styles.moveBtnPressed
						]}
					>

						<Text style={styles.moveBtnText}>이동</Text>
					</Pressable>
				</View>

			</View>

			{/* 룰렛 + 공 입구 */}
			<View style={styles.bottomRow}>
				{/* 룰렛 돌리는 버튼 -> 클릭하면 360도 돌아감 */}
				<Pressable onPress={spinOnce}>
					<Animated.View style={[styles.roundBtn, { transform: [{ rotate: spin }] }]}>
						<View style={styles.pointerLine} />
					</Animated.View>
				</Pressable>

				{/* 공 나오는 입구 */}
				<View style={styles.rectBtn}>
					<View style={styles.rectBtn2}></View>
				</View>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		width: width * 0.9,
		alignSelf: "center",
		flex: 1,
		padding: 24,
		backgroundColor: "white",
		borderRadius: 32,
		borderWidth: 1,
		borderColor: RouletteColors.btnBorder,
		justifyContent: 'space-between',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.18,
		shadowRadius: 18,
		elevation: 12,
	},
	displayPanel: {
		height: 170,
		backgroundColor: RouletteColors.main,
		borderRadius: 24,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.25,
		shadowRadius: 6,
		elevation: 6,
	},
	highlightOverlay: {
		position: "absolute",
		top: 6,
		left: 6,
		right: 6,
		height: 20,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.15)",
	},
	panel: {
		height: 50,
		backgroundColor: RouletteColors.main,
		borderRadius: 12,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
	},
	panel2: {
		height: 50,
		backgroundColor: RouletteColors.sub,
		borderRadius: 12,
		marginBottom: 8,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 24,
		flex: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	panelRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	moveBtn: {
		position: "absolute",
		right: 0,	// panel2 안에서 오른쪽 정렬
		width: 60,
		height: 48,
		backgroundColor: RouletteColors.btnBorder,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 6,
		elevation: 6,
	},
	moveBtnPressed: {
		backgroundColor: RouletteColors.main,
		transform: [{ translateY: 2 }],
		shadowOpacity: 0.1,
		elevation: 2,
	},
	moveBtnText: {
		color: "white",
		fontWeight: "bold",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
		marginLeft: 25,
		marginRight: 15,
	},
	roundBtn: {
		width: 120,
		height: 120,
		backgroundColor: RouletteColors.sub,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: RouletteColors.btnBorder,
		alignItems: "center",
		justifyContent: "center",
		overflow: "visible",	// 선 잘리는 것 방지
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 12,
	},
	pointerLine: {
		position: "absolute",
		top: "50%-17", // 원 밖으로 튀어나옴
		width: "115%",
		height: 34,
		backgroundColor: RouletteColors.sub,
		borderWidth: 1,
		borderColor: RouletteColors.btnBorder,
		borderRadius: 10,
	},
	rectBtn: {
		width: 90,
		height: 120,
		backgroundColor: RouletteColors.sub,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: RouletteColors.btnBorder,
		alignItems: "center",
		justifyContent: "center",
	},
	rectBtn2: {
		position: "absolute",
		bottom: 8,
		width: 75,
		height: 75,
		backgroundColor: "white",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: RouletteColors.btnBorder,
		alignItems: "center",
		justifyContent: "center",
	}
});
