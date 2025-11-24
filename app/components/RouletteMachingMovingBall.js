import React, { useRef, useEffect, useState } from "react";
import { View, Animated, Dimensions } from "react-native";
import Ball from "./Ball";
import Ball2 from "./Ball2";

const BALL_SIZE = 60; // 공 크기
const NUM_BALLS = 15;  // 공 개수
const DURATION = 5000; // 5초

const RouletteMachingMovingBall = ({ start = false }) => {
	const { width } = Dimensions.get("window");
	const boxWidth = width * 0.9 - 48;
	const boxHeight = 170;


	// 공 상태
	const balls = useRef(
		Array.from({ length: NUM_BALLS }, () => {
			const maxOffset = 15;
			return {
				x: new Animated.Value(Math.random() * (boxWidth - BALL_SIZE)),
				y: new Animated.Value(boxHeight - maxOffset + Math.random() * maxOffset - BALL_SIZE),
				velocityX: (Math.random() * 3 + 0.3) * (Math.random() < 0.5 ? 1 : -1),
				velocityY: (Math.random() * 3 + 0.3) * (Math.random() < 0.5 ? 1 : -1),

			};
		})
	).current;

	useEffect(() => {
		if (!start) return;

		// velocity 리셋
		balls.forEach(ball => {
			ball.velocityX = (Math.random() * 3 + 0.3) * (Math.random() < 0.5 ? 1 : -1);
			ball.velocityY = (Math.random() * 3 + 0.3) * (Math.random() < 0.5 ? 1 : -1);
		});

		let animationFrameId;

		const animate = () => {
			balls.forEach((ball) => {
				let newX = ball.x._value + ball.velocityX;
				let newY = ball.y._value + ball.velocityY;

				// 벽 충돌 처리
				if (newX <= 0 || newX >= boxWidth - BALL_SIZE) ball.velocityX *= -1;
				if (newY <= 0 || newY >= boxHeight - BALL_SIZE) ball.velocityY *= -1;

				ball.x.setValue(newX);
				ball.y.setValue(newY);
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		// 5초 후 바람 종료
		const timer = setTimeout(() => {
			cancelAnimationFrame(animationFrameId); // 루프 중지


		}, DURATION);

		// 공 아래로 떨어뜨리기
		balls.forEach((ball) => {
			Animated.timing(ball.y, {
				toValue: boxHeight - BALL_SIZE,
				duration: 500, // 떨어지는 속도
				useNativeDriver: true,
			}).start();
		});

		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(animationFrameId);
		};
	}, [start]);


	return (
		<View style={{ width: boxWidth, height: boxHeight, position: "relative" }}>
			{balls.map((ball, i) => (
				// <Animated.Image
				// 	key={i}
				// 	source={require("../../assets/RouletteMachine_Ball.png")}
				// 	style={{
				// 		width: BALL_SIZE,
				// 		height: BALL_SIZE,
				// 		position: "absolute",
				// 		transform: [{ translateX: ball.x }, { translateY: ball.y }],
				// 	}}
				// />
				<Animated.View
					key={i}
					style={{
						position: "absolute",
						transform: [{ translateX: ball.x }, { translateY: ball.y }],
					}}
				>
					<Ball2 size={BALL_SIZE} />
				</Animated.View>
			))}
		</View>
	);
};

export default RouletteMachingMovingBall;
