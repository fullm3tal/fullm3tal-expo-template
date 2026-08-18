import {useCallback} from 'react'
import {type StyleProp, type ViewStyle} from 'react-native'

import ExpoDateTimePicker from '@expo/ui/community/datetime-picker'

import {useAppTheme} from '@/shared/theme/theming/use-app-theme'

// ---------------------------------------------------------------------------
// Types  (re-exported from @expo/ui for consumer convenience)
// ---------------------------------------------------------------------------

/** Event payload passed to {@link IDatePickerProps.onValueChange}. */
export interface DateTimePickerChangeEvent {
  nativeEvent: {timestamp: number; utcOffset: number}
}

/** Picker mode — determines whether the user selects a date, time, or both. */
export type DatePickerMode = 'date' | 'time' | 'datetime'

/**
 * Display style.
 *
 * - Android: `"default"` | `"spinner"`.
 * - iOS: `"default"` | `"spinner"` | `"compact"` | `"inline"`.
 */
export type DatePickerDisplay = 'default' | 'spinner' | 'compact' | 'inline' | 'calendar' | 'clock'

/**
 * How the picker is presented (Android only).
 *
 * - `"inline"` — renders the picker directly in the view hierarchy.
 * - `"dialog"` — shows a modal dialog that opens on mount.
 *
 * On iOS this prop is accepted but ignored (always inline).
 */
export type DatePickerPresentation = 'inline' | 'dialog'

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

/**
 * Props interface for the {@link DatePicker} wrapper component.
 *
 * Mirrors the full `@expo/ui` `DateTimePicker` API surface while adding
 * theme integration (accent color defaults to the theme's `primary` token).
 * All visual styling should be applied via the `style` prop.
 */
export interface IDatePickerProps {
  /** The current date value (controlled). */
  value: Date

  /**
   * Called when the user selects a date or time.
   *
   * @param event - Native event containing timestamp and UTC offset.
   * @param date  - The newly selected `Date` object.
   */
  onValueChange?: (event: DateTimePickerChangeEvent, date: Date) => void

  /**
   * Picker mode.
   * @default "date"
   */
  mode?: DatePickerMode

  /**
   * Display style.
   * @default "default"
   */
  display?: DatePickerDisplay

  /**
   * Presentation mode (Android only, ignored on iOS).
   * @default "dialog"
   */
  presentation?: DatePickerPresentation

  /** The earliest selectable date. */
  minimumDate?: Date

  /** The latest selectable date. */
  maximumDate?: Date

  /**
   * Accent/tint color applied to the picker.
   * Defaults to the current theme's `primary` color when omitted.
   */
  accentColor?: string

  /** Whether the picker is disabled (iOS only). */
  disabled?: boolean

  /** Use 24-hour format (Android only). */
  is24Hour?: boolean

  /** Locale identifier, e.g. `"en_US"` (iOS only). */
  locale?: string

  /** IANA time zone name, e.g. `"America/New_York"` (iOS only). */
  timeZoneName?: string

  /**
   * Force a specific color scheme on the picker (iOS only).
   * Accepts `"dark"` or `"light"`.
   */
  themeVariant?: 'dark' | 'light'

  /** Called when the picker is dismissed without selecting a value (Android only). */
  onDismiss?: () => void

  /** A test ID forwarded to the native view. */
  testID?: string

  /**
   * Additional styles applied to the picker container.
   */
  style?: StyleProp<ViewStyle>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * A theme-aware wrapper around `@expo/ui`'s `DateTimePicker`.
 *
 * Uses Jetpack Compose on Android and SwiftUI on iOS for a modern
 * Material 3 / SwiftUI appearance. The accent color defaults to the
 * current theme's `primary` token.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState(new Date());
 *
 * <DatePicker
 *   value={date}
 *   onValueChange={(_event, selected) => setDate(selected)}
 *   mode="date"
 * />
 *
 * <DatePicker
 *   value={date}
 *   onValueChange={(_event, selected) => setDate(selected)}
 *   mode="datetime"
 *   minimumDate={new Date()}
 *   style={{ marginTop: 16 }}
 * />
 * ```
 */
function DatePicker({
  value,
  onValueChange,
  mode = 'date',
  display,
  presentation,
  minimumDate,
  maximumDate,
  accentColor,
  disabled,
  is24Hour,
  locale,
  timeZoneName,
  themeVariant,
  onDismiss,
  testID,
  style,
}: IDatePickerProps) {
  const {colors, dark} = useAppTheme()

  const resolvedAccent = accentColor ?? (colors.primary as string)
  const resolvedThemeVariant = themeVariant ?? (dark ? 'dark' : 'light')

  const handleValueChange = useCallback(
    (event: DateTimePickerChangeEvent, date: Date) => {
      onValueChange?.(event, date)
    },
    [onValueChange],
  )

  return (
    <ExpoDateTimePicker
      value={value}
      onValueChange={handleValueChange}
      mode={mode}
      display={display}
      presentation={presentation}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      accentColor={resolvedAccent}
      disabled={disabled}
      is24Hour={is24Hour}
      locale={locale}
      timeZoneName={timeZoneName}
      themeVariant={resolvedThemeVariant}
      onDismiss={onDismiss}
      testID={testID}
      style={style}
    />
  )
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
