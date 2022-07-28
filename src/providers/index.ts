import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ObjectKeyDynamicI {
    [key: string]: string | number
}

class Provider {
    private readonly axios: AxiosInstance;

    constructor(api: string, config: AxiosRequestConfig = {}, headers = {}) {
        this.axios = axios.create({
            baseURL: api,
            withCredentials: true,
            ...config,
            headers
        });
    }

    private params(params: ObjectKeyDynamicI) {
        params = typeof params == "object" ? params : {};
        return Object.keys(params).map((key) => {
            let value = params[key];
            value = typeof value == typeof {} ? JSON.stringify(value) : value;
            return `${key}=${value}`;
        }).join("&");
    }

    protected get(url: string, params: any = {}, config: AxiosRequestConfig = {}) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.get(`${url}${!hasQuery ? `?${this.params(params)}` : ``}`, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected post(url: string, data: object = {}, config: AxiosRequestConfig = {}, params: any = {}) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.post(`${url}${!hasQuery ? `?${this.params(params)}` : ``}`, data, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected update(url: string, data: object = {}, config: AxiosRequestConfig = {}, params: any = {}) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.patch(`${url}${!hasQuery ? `?${this.params(params)}` : ``}`, data, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected delete(url: string, config: AxiosRequestConfig = {}, params: any = {}) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.delete(`${url}${!hasQuery ? `?${this.params(params)}` : ``}`, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }
}

export default Provider;