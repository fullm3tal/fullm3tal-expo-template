import {useAuthStore} from '@/shared/store/auth-store'
import {Redirect, Stack} from 'expo-router'

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Redirect href={"/(tabs)" as any} />
  return <Stack screenOptions={{headerShown: false}} />
}
