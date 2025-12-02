// GoogleLoginScreen.js

import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import axios from 'axios';
import { loadAccessToken, saveAccessToken, saveRefreshToken } from '../../tokenStorage';
import readBlob from './../../node_modules/axios/lib/helpers/readBlob';

WebBrowser.maybeCompleteAuthSession();

// 백엔드 주소
const BACKEND_URL = "https://inha-dewbob.p-e.kr/auth";

// 앱이 돌아올 redirect URI
// const redirectUri = Linking.createURL("auth/callback");  // Inhadewbob-FE://auth/callback
// console.log("Redirect URI:", redirectUri);
const redirectUri = "https://inha-dewbob.p-e.kr/auth/login/google/callback"

function extractTokens(response) {
    return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token
    };
}


export default function Login({ navigation }) {
    const [userInfo, setUserInfo] = useState(null);
    const [ART, setART] = useState([]); // access, refresh token 저장용

    const saveToken = async () => {
        try {
            console.log("saveToken raw ART:", ART);

            const parsed = JSON.parse(ART);
            console.log("parsed:", parsed);

            const { accessToken, refreshToken } = extractTokens(parsed);

            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);

            // 🔥 TOKEN 저장
            await saveAccessToken(accessToken);
            await saveRefreshToken(refreshToken);

            console.log("토큰 저장 완료");

            // 🔥 저장된 AccessToken 사용해서 프로필 요청
            const storedAccess = await loadAccessToken();

            const res = await axios.get(`${BACKEND_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${storedAccess}`,
                },
            });

            console.log("User Profile:", res.data);
            setUserInfo(res.data);

        } catch (err) {
            console.error("saveToken ERROR:", err);
        }
    };


    const handleGoogleLogin = async () => {
        try {
            const { data: googleAuthUrl } = await axios.get(
                `${BACKEND_URL}/login/google`
            );

            console.log("Google Auth URL:", googleAuthUrl);

            const result = await WebBrowser.openAuthSessionAsync(
                googleAuthUrl
            );

            console.log("Browser Result:", result);

            if (result.type === "success") {
                console.log("🎉 정상적으로 앱으로 돌아옴");
            } else if (result.type === "cancel") {
                console.log("❌ 사용자가 X 버튼으로 창을 닫음");
            } else {
                console.log("기타 상태:", result.type);
            }

        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="구글 로그인" onPress={handleGoogleLogin} />
            <Button title="토큰 저장" onPress={saveToken}></Button>

            <Button title="home" onPress={() => { navigation.navigate("Main") }}></Button>

            <TextInput
                style={{ backgroundColor: "green" }}
                onChangeText={(txt) => {
                    console.log(txt);
                    setART(txt);
                }}
            />
            {userInfo && (
                <View style={{ marginTop: 20 }}>
                    <Text>이메일: {userInfo.email}</Text>
                    <Text>닉네임: {userInfo.nickname}</Text>
                </View>
            )}
        </View>
    );
}
