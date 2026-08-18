import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {LanguageProvider} from '@/shared/locale/language-provider'
import ThemeProvider from '@/shared/theme/theming/theme-provider'
import {Stack} from 'expo-router'
import '@/shared/locale/i18n'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <Stack />
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
