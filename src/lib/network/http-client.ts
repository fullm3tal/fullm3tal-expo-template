import { AxiosRequestConfig } from "axios";

export interface HttpClient {
  get<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  put<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  delete<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
}
