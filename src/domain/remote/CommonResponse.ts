export interface CommonResponse<T> {
  responseMessage: boolean;
  message?: string;
  data?: T;
}
