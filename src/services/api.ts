import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:44336/'
});

export const setupApiService = {
    setupHeaders: (token: string) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    setupInterceptors: (removeCookie: any) => {
        api.interceptors.response.use(
            undefined,
            (err) => {
                if (err.response.status === 401) {
                    removeCookie('loginToken', { path: '/' });
                };

                return Promise.reject(err);
            },
        );
    },
};