import axios from "axios";
import { loadAccessToken, deleteAccessToken, loadRefreshToken } from "../../tokenStorage";

export const BASE_URL = "https://inha-dewbob.p-e.kr";

const api = axios.create({
    baseURL: `${BASE_URL}`,
    withCredentials: true, // refresh 쿠키를 쓰는 경우 필요
});

let isRefreshing = false;
let queue = []; // resolve, reject. config

const flushQueue = (error, newAccess) => {
    queue.forEach(({ resolve, reject, config }) => {
        if (error) return reject(error);
        if (newAccess) config.headers.Authorization = `Bearer ${newAccess}`;
        resolve(api(config));
    });
    queue = [];
};

api.interceptors.request.use(async (config) => {
    const token = await loadAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // refresh 요청 자체가 실패하면 바로 로그아웃
        if (originalRequest?.url?.includes("/auth/refresh")) {
            await deleteAccessToken();
            global.navigationRef?.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
            return Promise.reject(error);
        }

        if (error?.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await loadRefreshToken();
                if (!refreshToken) throw new Error("NO_REFRESH");

                // ✅ refresh 요청은 baseURL 포함해서
                const res = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    { refresh_token: refreshToken },
                    { withCredentials: true }
                );

                const newAccessToken = res.data?.accessToken;
                if (!newAccessToken) throw new Error("NO_NEW_ACCESS");

                // ✅ accessToken 저장
                await AsyncStorage.setItem("accessToken", newAccessToken);

                // ✅ 원래 요청에 새 토큰 주입
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.log("[REFRESH 실패] 로그아웃 처리");

                await deleteAccessToken();

                global.navigationRef?.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


// api.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//         const original = error?.config;

//         // 원본 없거나 이미 재시도면 패스
//         if (!original || original._retry) return Promise.reject(error);

//         // 🔒 refresh 루프 방지
//         if (original.url?.includes("/auth/refresh")) {
//             return Promise.reject(error);
//         }

//         const status = error?.response?.status;

//         // ✅ 401/403 이 "아닐 때만" 탈출
//         if (status !== 401 && status !== 403) {
//             return Promise.reject(error);
//         }

//         // 중복 재시도 방지
//         original._retry = true;

//         if (isRefreshing) {
//             return new Promise((resolve, reject) => {
//                 queue.push({ resolve, reject, config: original });
//             });
//         }

//         isRefreshing = true;
//         try {
//             const refreshToken = await tokenStorage.getRefreshTStorage();
//             if (!refreshToken) throw new Error("NO_REFRESH");

//             // ⚠️ studentId가 이 스코프에 없다면 제거하거나, 토큰에서 디코드해서 채우세요.
//             // const studentId = decoded?.studentId ?? decoded?.sub;
//             const { data } = await api.post("/auth/refresh", {
//                 studentId,
//                 refreshToken,
//             });

//             const newAccess = data?.accessToken;
//             const newRefresh = data?.refreshToken || refreshToken;
//             if (!newAccess) throw new Error("NO_NEW_ACCESS");

//             TokenStore.setToken(newAccess);
//             await tokenStorage.saveTStorage({
//                 accessToken: newAccess,
//                 refreshToken: newRefresh,
//             });

//             // 대기열 처리(모든 대기 요청에 새 토큰 주입 후 재시도)
//             flushQueue(null, newAccess);

//             // 원본에도 토큰 주입 후 재시도
//             original.headers = original.headers || {};
//             original.headers.Authorization = `Bearer ${newAccess}`;
//             return api(original);
//         } catch (e) {
//             flushQueue(e, null);
//             TokenStore.clearToken();
//             await tokenStorage.clearTStorage();
//             return Promise.reject(e);
//         } finally {
//             isRefreshing = false;
//         }
//     }
// );

export default api;