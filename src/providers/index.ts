import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ResponseProviderI } from "../interfaces/response";

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

    protected get<D, ParamsI = {}>(url: string, params?: ParamsI, config: AxiosRequestConfig = {}): Promise<D> {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.get(`${url}${!hasQuery ? `?${this.params(params || {})}` : ``}`, config)
                .then(response => resolve(response?.data))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected post<ParamsI>(url: string, data: object = {}, config: AxiosRequestConfig = {}, params?: ParamsI) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.post(`${url}${!hasQuery ? `?${this.params(params || {})}` : ``}`, data, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected update<ParamsI>(url: string, data: object = {}, config: AxiosRequestConfig = {}, params?: ParamsI) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.patch(`${url}${!hasQuery ? `?${this.params(params || {})}` : ``}`, data, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }

    protected delete<ParamsI>(url: string, config: AxiosRequestConfig = {}, params?: ParamsI) {
        return new Promise((resolve) => {
            let hasQuery = url.includes("?");
            this.axios.delete(`${url}${!hasQuery ? `?${this.params(params || {})}` : ``}`, config)
                .then(response => resolve(response))
                .catch(error => resolve(error?.response?.data));
        });
    }
}

export default Provider;