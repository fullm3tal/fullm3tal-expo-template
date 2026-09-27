import '@/shared/locale/i18n'
import {LanguageProvider} from '@/shared/locale/language-provider'
import ThemeProvider from '@/shared/theme/theming/theme-provider'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Stack} from 'expo-router'
import React, {useState} from 'react'
import {PortalProvider} from 'react-native-teleport'

export default function RootLayout() {
  const [queryClient] = useState(new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <PortalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </PortalProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
