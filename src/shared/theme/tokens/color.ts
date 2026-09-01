import { ThemeColors } from '../types'
import { blueLight, blueDark, redLight, redDark } from './themes'

export type ColorScheme = 'light' | 'dark'

export type ColorTheme = 'red' | 'blue'

export function buildScheme(colorTheme: ColorTheme, colorScheme: ColorScheme): ThemeColors {
  if (colorTheme === 'blue') {
    return colorScheme === 'dark' ? blueDark : blueLight
  }
  if (colorTheme === 'red') {
    return colorScheme === 'dark' ? redDark : redLight
  }
  
  return blueLight
}
