import axios from "axios";
import { loadAccessToken, deleteAccessToken } from "../../tokenStorage";

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
        if (error?.response?.status === 403) {
            console.log("[403 발생] accessToken 삭제 및 로그아웃 처리");

            // await deleteAccessToken();

            // 전역 네비게이션으로 Login 이동
            global.navigationRef?.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
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