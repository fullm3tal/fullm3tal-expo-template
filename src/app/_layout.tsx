import {PortalHost} from '@/components/primitives/portal'
import ThemeProvider from '@/theme/theming/ThemeProvider'
import {LanguageProvider} from '@/locales/LanguageProvider'
import {Stack} from 'expo-router'
import '../locales/i18n' //Add this line to your main.tsx

export default function RootLayout() {
  return (
    <>
      <LanguageProvider>
        <ThemeProvider>
          <Stack />
          <PortalHost />
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}
