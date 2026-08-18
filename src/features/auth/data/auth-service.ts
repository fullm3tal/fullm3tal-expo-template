import { service } from '@/infrastructure/network/client'
import { Endpoints } from '@/infrastructure/network/endpoints'
import type { SignInRequest, SignInResponse } from '../domain/types'

export const authService = {
  signIn: (payload: SignInRequest): Promise<SignInResponse> =>
    service.post<SignInRequest, SignInResponse>(Endpoints.auth.signIn, payload),

  signUp: (payload: SignInRequest): Promise<SignInResponse> =>
    service.post<SignInRequest, SignInResponse>(Endpoints.auth.signUp, payload),
}
