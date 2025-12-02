import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveRefreshToken(token) {
    await SecureStore.setItemAsync("refresh_token", token);
}

export async function loadRefreshToken() {
    const refresh_token = await SecureStore.getItemAsync("refresh_token");
    if(refresh_token == null) {
		console.log("No Refresh Token found.");
	}	

    return refresh_token;
}

export async function deleteRefreshToken() {
    return await SecureStore.deleteItemAsync("refresh_token");
}

// Access token은 SecureStore까지는 필요 없음
export async function saveAccessToken(token) {
    await AsyncStorage.setItem("access_token", token);
}

export async function loadAccessToken() {
    const access_token = await AsyncStorage.getItem("access_token");
    if(access_token == null) {
		console.log("No Access Token found.");
	}	

    return access_token;
}

export async function deleteAccessToken() {
    return await AsyncStorage.removeItem("access_token");
}
