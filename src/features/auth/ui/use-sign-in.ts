import KeystoreClient from '@/infrastructure/keystore/keystore-client'
import { KeystoreKeys } from '@/infrastructure/keystore/keystore-keys'
import { useAuthStore } from '@/shared/store/auth-store'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { authService } from '../data/auth-service'
import type { SignInRequest } from '../domain/types'

export function useSignIn() {
  const { setUser } = useAuthStore()

  const form = useForm<SignInRequest>({
    defaultValues: { email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: (payload: SignInRequest) => authService.signIn(payload),
    onSuccess: async (data) => {
      await Promise.all([
        KeystoreClient.save(KeystoreKeys.ACCESS_TOKEN, data.accessToken),
        KeystoreClient.save(KeystoreKeys.REFRESH_TOKEN, data.refreshToken),
      ])
      setUser(data.user)
    },
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
