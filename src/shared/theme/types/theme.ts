import {ColorScheme, ColorTheme} from '../tokens/color'
import type {ThemeColors} from './color'
import type {ThemeElevation} from './elevation'
import type {ThemeShapes} from './shape'
import type {Typescale} from './typography'

export type Theme = {
  dark: boolean
  animation: {
    scale: number
  }
  colors: ThemeColors
  fonts: Typescale
  shapes: ThemeShapes
  // motion: MotionConfig;
  elevation: ThemeElevation
  setColorTheme?: (theme: ColorTheme) => void
  setColorScheme?: (scheme: ColorScheme) => void
}

export type InternalTheme = Theme
