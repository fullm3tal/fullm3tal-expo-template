import {LanguageProvider} from '@/locales/LanguageProvider'
import ThemeProvider from '@/theme/theming/ThemeProvider'
import {Stack} from 'expo-router'
import '../locales/i18n' //Add this line to your main.tsx

export default function RootLayout() {
  return (
    <>
      <LanguageProvider>
        <ThemeProvider>
          <Stack />
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}
