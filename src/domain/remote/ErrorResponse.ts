export interface ErrorResponse {
  message?: string;
  translationLabel?: string;
  responseCode?: number | null;
  status?: string;
}
