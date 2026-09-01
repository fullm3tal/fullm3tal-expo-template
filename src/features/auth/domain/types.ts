import type {AuthUser} from '@/shared/store/auth-store'

export type {AuthUser}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}
