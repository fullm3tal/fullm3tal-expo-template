import type {AuthUser} from '@/shared/store/auth-store'

export type {AuthUser}

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}
