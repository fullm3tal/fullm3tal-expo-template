import { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient } from "./http-client";

export class HttpClientImpl implements HttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.axiosInstance.get<R>(url, config);
    return response.data;
  }

  async post<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const response = await this.axiosInstance.post<R>(url, data, config);
    return response.data;
  }

  async put<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const response = await this.axiosInstance.put<R>(url, data, config);
    return response.data;
  }

  async delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.axiosInstance.delete<R>(url, config);
    return response.data;
  }
}
