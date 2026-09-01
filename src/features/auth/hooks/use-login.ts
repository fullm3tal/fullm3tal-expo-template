import KeystoreClient from '@/infrastructure/keystore/keystore-client'
import { KeystoreKeys } from '@/infrastructure/keystore/keystore-keys'
import { useAuthStore } from '@/shared/store/auth-store'
import { useForm } from 'react-hook-form'
import type { LoginRequest } from '../data/types'
import { useLoginMutation } from '../data/use-login-mutation'

export function useLogin() {
  const { setUser } = useAuthStore()

  const form = useForm<LoginRequest>({
    defaultValues: { email: '', password: '' },
  })

  const mutation = useLoginMutation({
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
