let accessToken = null;

export const tokenStore = {
    setToken: (token) => {
        accessToken = token;
    },
    getToken: () => {
        return accessToken;
    },
    clearToken: () => {
        accessToken = null;
    },
};