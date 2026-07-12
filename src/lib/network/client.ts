import { ErrorResponse } from "@/domain/remote/ErrorResponse";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import i18next from "i18next";
import { prettifyJson } from "./utils";

const DEFAULT_TIMEOUT_MS = 10_000;

type RequestWithMeta = InternalAxiosRequestConfig & {
  metadata?: {
    startTime: number;
  };
};

function getRequestLabel(config: InternalAxiosRequestConfig): string {
  const method = (config.method ?? "GET").toUpperCase();
  const url = `${config.baseURL ?? ""}${config.url ?? ""}`;
  return `${method} ${url}`;
}

const client = axios.create({
  baseURL: "http://192.168.1.5:8080",
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const request = config as RequestWithMeta;
    request.metadata = { startTime: Date.now() };
    console.log(
      `[API][Request] ${getRequestLabel(config)}`,
      prettifyJson({
        params: config.params,
        data: config.data,
      }),
    );
    return config;
  },
  (error: AxiosError) => {
    console.log("[API][Request Error]", error.message, {
      code: error.code,
    });
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    const request = response.config as RequestWithMeta;
    const elapsedMs = request.metadata
      ? Date.now() - request.metadata.startTime
      : undefined;
    console.log(
      `[API][Response] ${getRequestLabel(response.config)} ${response.status}`,
      {
        elapsedMs,
        data: response.data,
      },
    );
    return response;
  },
  (error: any) => {
    const request = error.config as RequestWithMeta | undefined;
    const elapsedMs = request?.metadata
      ? Date.now() - request.metadata.startTime
      : undefined;

    // Normalize response payload: some APIs nest the real payload under `data` (i.e. { data: { ... } })
    const respData = error.response?.data;
    const payload = respData?.data ?? respData;

    // Extract fields with robust fallbacks
    const extractedMessage: string | undefined =
      payload?.message ?? respData?.message ?? error.message;

    const rawResponseCode =
      payload?.responseCode ?? respData?.responseCode ?? null;
    const parsedResponseCode =
      typeof rawResponseCode === "number"
        ? rawResponseCode
        : typeof rawResponseCode === "string" && rawResponseCode !== ""
          ? isNaN(Number(rawResponseCode))
            ? null
            : parseInt(rawResponseCode)
          : null;

    const translationLabel =
      payload?.translationLabel ??
      respData?.translationLabel ??
      "msg_unknown_error";

    // Try to translate the translation label using i18n
    let translatedLabelText: string | undefined;
    try {
      translatedLabelText =
        i18next && typeof i18next.t === "function"
          ? i18next.t(translationLabel)
          : undefined;
    } catch (e) {
      translatedLabelText = undefined;
    }

    const finalMessage =
      (translatedLabelText && translatedLabelText !== translationLabel
        ? translatedLabelText
        : undefined) ??
      extractedMessage ??
      "An unknown error occurred";

    const errorResponse: ErrorResponse = {
      status: error.response?.status,
      message: finalMessage,
      responseCode: parsedResponseCode,
      translationLabel,
    };

    console.log(
      `[API][Response Error] ${request ? getRequestLabel(request) : "UNKNOWN"}`,
      errorResponse,
      { translatedLabelText },
      payload,
      {
        status: error.response?.status,
        message: extractedMessage ?? error.message,
        elapsedMs,
        data: error.response?.data,
      },
    );

    return Promise.reject(errorResponse);
  },
);

export interface HttpClient {
  get<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  put<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  delete<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
}

class HttpClientImpl implements HttpClient {
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

export const service = new HttpClientImpl(client);
