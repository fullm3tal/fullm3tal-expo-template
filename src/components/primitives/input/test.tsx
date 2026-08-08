import KeystoreClient from '@/lib/keystore/KeystoreClient'
import {KeystoreKeys} from '@/lib/keystore/KeystoreKeys'
import Constants from 'expo-constants'
import React, {useCallback, useEffect} from 'react'
import {useColorScheme} from 'react-native'
import {buildScheme, ColorScheme, ColorTheme} from '../tokens/color'
import {defaultElevation} from '../tokens/elevation'
import {defaultShapes} from '../tokens/shape'
import {typescale} from '../tokens/typography'
import {Theme} from '../types'
import {ThemeContext} from './ThemeContext'

function ThemeProvider({children}: {children: React.ReactNode}) {
  const scheme = useColorScheme()

  const {isDarkAllowed} = Constants.expoConfig?.extra ?? {}
  const isDarkMode = scheme === 'dark'

  const [theme, setTheme] = React.useState<Theme>({
    dark: isDarkAllowed && isDarkMode,
    animation: {
      scale: 1, // TODO: Add support for user preference for reduced motion
    },
    colors: buildScheme('blue', 'light'),
    fonts: typescale,
    shapes: defaultShapes,
    elevation: defaultElevation,
  })

  const setColorTheme = useCallback(
    async (theme: ColorTheme) => {
      await KeystoreClient.save(KeystoreKeys.THEME_COLOR_THEME, theme)
      const colorScheme = await KeystoreClient.getValueFor(KeystoreKeys.THEME_COLOR_SCHEME)
      setTheme((prevTheme) => ({
        ...prevTheme,
        dark: isDarkAllowed && isDarkMode,
        colors: buildScheme(theme, colorScheme as ColorScheme),
      }))
    },
    [isDarkAllowed, isDarkMode],
  )

  const setColorScheme = useCallback(
    async (scheme: ColorScheme) => {
      await KeystoreClient.save(KeystoreKeys.THEME_COLOR_SCHEME, scheme)
      const colorTheme = await KeystoreClient.getValueFor(KeystoreKeys.THEME_COLOR_THEME)
      setTheme((prevTheme) => ({
        ...prevTheme,
        dark: isDarkAllowed && isDarkMode,
        colors: buildScheme(colorTheme as ColorTheme, scheme),
      }))
    },
    [isDarkAllowed, isDarkMode],
  )

   useEffect(() => {
    async function initAppTheme() {
      const cacheColorScheme = await KeystoreClient.getValueFor(KeystoreKeys.THEME_COLOR_SCHEME)
      const cacheColorTheme = await KeystoreClient.getValueFor(KeystoreKeys.THEME_COLOR_THEME)
      const colorScheme = cacheColorScheme ? (cacheColorScheme as ColorScheme) : isDarkMode ? 'dark' : 'light'
      const colorTheme = cacheColorTheme ? (cacheColorTheme as ColorTheme) : ('red' as ColorTheme)

      if (!cacheColorScheme) {
        await KeystoreClient.save(KeystoreKeys.THEME_COLOR_SCHEME, colorScheme)
      }
      if (!cacheColorTheme) {
        await KeystoreClient.save(KeystoreKeys.THEME_COLOR_THEME, colorTheme)
      }
      setTheme((prevTheme) => ({
        ...prevTheme,
        dark: isDarkAllowed && isDarkMode,
        colors: buildScheme(colorTheme, colorScheme),
      }))
    }

    initAppTheme()
  }, [isDarkAllowed, isDarkMode])

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        setColorTheme: setColorTheme,
        setColorScheme: setColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
