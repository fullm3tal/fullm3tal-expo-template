import { service } from '@/infrastructure/network/client'
import { Endpoints } from '@/infrastructure/network/endpoints'
import type { LoginRequest, LoginResponse } from '../domain/types'

export const authService = {
  login: (payload: LoginRequest): Promise<LoginResponse> =>
    service.post<LoginRequest, LoginResponse>(Endpoints.auth.login, payload),

  signUp: (payload: LoginRequest): Promise<LoginResponse> =>
    service.post<LoginRequest, LoginResponse>(Endpoints.auth.signUp, payload),
}
