import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, Animated } from 'react-native';
import RouletteMachineMovingBall from './RouletteMachingMovingBall';


const { width } = Dimensions.get("window");


export default function RouletteMachine({ handlePresentModalPress }) {
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
					boxSize={150}
					numBalls={5}
					duration={5000}
					start={spinning}
				/>
			</View>
			
			{/* 오늘 예산 출력되는 패널 */}
			<View style={styles.panel}>
				<Text>오늘의 한끼 추천 예산 <Text style={{ fontWeight: "bold" }}>₩ 55,000</Text></Text>
			</View>

			{/* 예산, 카테고리 선택 패널, 버튼 */}
			<View style={styles.panelRow}>
				<View style={styles.panel}>
					<Text style={{ fontWeight: 'bold', fontSize: 15, color: "#bbb" }}>예산과 카테고리 선택해듀</Text>
				</View>
				
				<Pressable style={styles.moveBtn} onPress={() => {console.log("click"); handlePresentModalPress();}}>
					<Text style={styles.moveBtnText}>이동</Text>
				</Pressable>
			</View>

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
		width: width * 0.8,
		alignSelf: "center",
		flex: 1,
		padding: 24,
		backgroundColor: "#F5F5F5",
		borderRadius: 32,
		borderWidth: 1,
		borderColor: "#4A84FFBF",
		justifyContent: 'space-between'
	},
	displayPanel: {
		height: 150,
		backgroundColor: "#4A84FFbb",
		borderRadius: 24,
		marginBottom: 16,
	},
	panel: {
		height: 50,
		backgroundColor: "#DEE9FF",
		borderRadius: 12,
		marginBottom: 8,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 24,
		flex: 1,
	},
	panelRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	moveBtn: {
		width: 60,
		height: 48,
		backgroundColor: "#4A84FFBF",
		borderRadius: 12,
		marginLeft: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	moveBtnText: {
		color: "white",
		fontWeight: "bold",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
	},
	roundBtn: {
		width: 120,
		height: 120,
		backgroundColor: "#DEE9FF",
		borderRadius: 60,
		borderWidth: 1,
		borderColor: "#4A84FFBF",
		alignItems: "center",
		justifyContent: "center",
		overflow: "visible", // 선 잘리는 것 방지
	},
	pointerLine: {
		position: "absolute",
		top:"50%-17", // 원 밖으로 튀어나옴
		width: "115%",
		height: 34,
		backgroundColor: "#DEE9FF",
		borderWidth: 1,
		borderColor: "#4A84FFBF",
		borderRadius: 2,
	},
	rectBtn: {
		width: 90,
		height: 120,
		backgroundColor: "#DEE9FF",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#4A84FFBF",
		alignItems: "center",
		justifyContent: "center",
	},
	rectBtn2: {
		position: "absolute",
		top:8,
		width: 75,
		height: 75,
		backgroundColor: "#F5F5F5",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#4A84FFBF",
		alignItems: "center",
		justifyContent: "center",
	}
});
