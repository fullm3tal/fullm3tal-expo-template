import {useContext} from 'react'

import type {ColorScheme, ColorTheme} from '../tokens/color'
import type {Theme} from '../types'
import {ThemeContext} from './theme-context'

/**
 * The full return type of {@link useAppTheme}.
 *
 * Extends `Theme` with guaranteed `setColorScheme` and `setColorTheme`
 * mutators (non-optional, unlike the base `Theme` type).
 */
export type AppTheme = Theme & {
  /** Update the active color scheme (e.g. "light" | "dark"). */
  setColorScheme: (scheme: ColorScheme) => void
  /** Update the active color theme (e.g. "blue" | "red" | …). */
  setColorTheme: (theme: ColorTheme) => void
}

/**
 * Consumes the nearest `ThemeProvider` and returns the current
 * {@link AppTheme} — including colors, typography, shapes,
 * elevation, and mutators for switching color scheme / theme.
 *
 * @throws If called outside of a `<ThemeProvider>`.
 *
 * @example
 * ```tsx
 * const { colors, dark, setColorScheme } = useAppTheme();
 * ```
 */
export function useAppTheme(): AppTheme {
  const theme = useContext(ThemeContext)

  if (!theme) {
    throw new Error('useAppTheme must be used within a <ThemeProvider>. ' + 'Wrap your component tree with <ThemeProvider> before calling this hook.')
  }

  // The provider always supplies both setters — assert them as non-optional.
  return theme as AppTheme
}
