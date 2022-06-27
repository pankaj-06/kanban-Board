import axios, { AxiosRequestConfig } from "axios";

export const getApiCall = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.get(url, config);
}

export const postApiCall = (url: string, data: any, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.post(url, data, config);
}

export const deleteApiCall = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.delete(url, config);
}

export const editApiCall = (url: string, data: any, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.put(url, data, config);
}

