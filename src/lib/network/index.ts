import { axiosClient } from "./client";
import { HttpClientImpl } from "./http-client-impl";

export const httpClient = new HttpClientImpl(axiosClient);
