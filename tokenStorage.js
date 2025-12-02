import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveRefreshToken(token) {
    await SecureStore.setItemAsync("refresh_token", token);
}

export async function loadRefreshToken() {
    return await SecureStore.getItemAsync("refresh_token");
}

export async function deleteRefreshToken() {
    return await SecureStore.deleteItemAsync("refresh_token");
}

// Access token은 SecureStore까지는 필요 없음
export async function saveAccessToken(token) {
    await AsyncStorage.setItem("access_token", token);
}

export async function loadAccessToken() {
    return await AsyncStorage.getItem("access_token");
}

export async function deleteAccessToken() {
    return await AsyncStorage.removeItem("access_token");
}
