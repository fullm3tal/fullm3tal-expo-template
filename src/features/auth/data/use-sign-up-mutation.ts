import { service } from '@/infrastructure/network/client'
import { Endpoints } from '@/infrastructure/network/endpoints'
import type { ErrorResponse } from '@/shared/types/remote/error-response'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import type { LoginRequest, LoginResponse } from './types'

export function useSignUpMutation(
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginRequest>
) {
  return useMutation({
    mutationFn: (payload: LoginRequest): Promise<LoginResponse> =>
      service.post<LoginRequest, LoginResponse>(Endpoints.auth.signUp, payload),
    ...options,
  })
}
