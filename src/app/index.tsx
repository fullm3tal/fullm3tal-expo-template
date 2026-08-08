import Text from '@/components/primitives/text'
import {useLanguage} from '@/locales/LanguageProvider'
import {useAppTheme} from '@/theme/theming/useAppTheme'
import type {ColorScheme, ColorTheme} from '@/theme/tokens/color'
import {useTranslation} from 'react-i18next'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native'

const COLOR_THEMES: {labelKey: string; value: ColorTheme; swatch: string}[] = [
  {labelKey: 'color_theme_blue', value: 'blue', swatch: '#1976D2'},
  {labelKey: 'color_theme_red', value: 'red', swatch: '#D32F2F'},
]

const COLOR_SCHEMES: {labelKey: string; value: ColorScheme; icon: string}[] = [
  {labelKey: 'appearance_light', value: 'light', icon: '☀️'},
  {labelKey: 'appearance_dark', value: 'dark', icon: '🌙'},
]

const LANGUAGES = [
  {labelKey: 'language_english', value: 'en', icon: '🇺🇸'},
  {labelKey: 'language_hindi', value: 'hi', icon: '🇮🇳'},
]

export default function Index() {
  const {colors, fonts, dark, shapes, setColorScheme, setColorTheme} = useAppTheme()

  const {language, setLanguage} = useLanguage()
  const {t} = useTranslation()

  const currentScheme: ColorScheme = dark ? 'dark' : 'light'

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.background}}
      contentContainerStyle={styles.container}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={[fonts.headlineMedium, {color: colors.onBackground}]}>{t('theme_switcher_title')}</Text>
        <Text style={[fonts.bodyMedium, {color: colors.onSurfaceVariant, marginTop: 4}]}>{t('theme_switcher_subtitle')}</Text>
      </View>

      {/* ── Color Scheme Section ── */}
      <View style={styles.section}>
        <Text style={[fonts.titleMedium, {color: colors.onSurface, marginBottom: 12}]}>{t('appearance_title')}</Text>
        <View style={styles.schemeRow}>
          {COLOR_SCHEMES.map((scheme) => {
            const isActive = currentScheme === scheme.value
            return (
              <Pressable
                key={scheme.value}
                onPress={() => setColorScheme(scheme.value)}
                style={[
                  styles.schemeCard,
                  {
                    borderRadius: shapes.corner.extraLargeIncreased,
                    backgroundColor: isActive ? colors.primaryContainer : colors.surfaceContainerHigh,
                    borderColor: isActive ? colors.primary : colors.outlineVariant,
                  },
                ]}
              >
                <Text style={styles.schemeIcon}>{scheme.icon}</Text>
                <Text
                  style={[
                    fonts.labelLarge,
                    {
                      color: isActive ? colors.onPrimaryContainer : colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {t(scheme.labelKey)}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* ── Language Section ── */}
      <View style={styles.section}>
        <Text style={[fonts.titleMedium, {color: colors.onSurface, marginBottom: 12}]}>{t('language_title')}</Text>
        <View style={styles.schemeRow}>
          {LANGUAGES.map((lang) => {
            const isActive = language === lang.value
            return (
              <Pressable
                key={lang.value}
                onPress={() => setLanguage(lang.value)}
                style={[
                  styles.schemeCard,
                  {
                    borderRadius: shapes.corner.extraLargeIncreased,
                    backgroundColor: isActive ? colors.primaryContainer : colors.surfaceContainerHigh,
                    borderColor: isActive ? colors.primary : colors.outlineVariant,
                  },
                ]}
              >
                <Text style={styles.schemeIcon}>{lang.icon}</Text>
                <Text
                  style={[
                    fonts.labelLarge,
                    {
                      color: isActive ? colors.onPrimaryContainer : colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {t(lang.labelKey)}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* ── Color Theme Section ── */}
      <View style={styles.section}>
        <Text style={[fonts.titleMedium, {color: colors.onSurface, marginBottom: 12}]}>{t('color_theme_title')}</Text>
        <View style={styles.themeGrid}>
          {COLOR_THEMES.map((theme) => {
            const isActive = colors.primary.toString() !== '' && theme.value === COLOR_THEMES.find((t) => t.swatch === colors.primary.toString())?.value

            return (
              <Pressable
                key={theme.value}
                onPress={() => setColorTheme(theme.value)}
                style={[
                  styles.themePill,
                  {
                    backgroundColor: colors.surfaceContainerHigh,
                    borderColor: colors.outlineVariant,
                  },
                ]}
              >
                <View style={[styles.swatch, {backgroundColor: theme.swatch}]} />
                <Text style={[fonts.labelLarge, {color: colors.onSurface}]}>{t(theme.labelKey)}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      {/* ── Live Preview ── */}
      <View style={styles.section}>
        <Text style={[fonts.titleMedium, {color: colors.onSurface, marginBottom: 12}]}>{t('preview_title')}</Text>

        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: colors.surfaceContainer,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          {/* Primary chip */}
          <View style={[styles.previewChip, {backgroundColor: colors.primary}]}>
            <Text style={[fonts.labelLarge, {color: colors.onPrimary}]}>{t('preview_primary')}</Text>
          </View>

          {/* Secondary chip */}
          <View style={[styles.previewChip, {backgroundColor: colors.secondary}]}>
            <Text style={[fonts.labelLarge, {color: colors.onSecondary}]}>{t('preview_secondary')}</Text>
          </View>

          {/* Tertiary chip */}
          <View style={[styles.previewChip, {backgroundColor: colors.tertiary}]}>
            <Text style={[fonts.labelLarge, {color: colors.onTertiary}]}>{t('preview_tertiary')}</Text>
          </View>

          {/* Error chip */}
          <View style={[styles.previewChip, {backgroundColor: colors.error}]}>
            <Text style={[fonts.labelLarge, {color: colors.onError}]}>{t('preview_error')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 48,
    gap: 32,
  },
  header: {
    gap: 4,
  },
  section: {
    gap: 0,
  },
  schemeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  schemeCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    gap: 8,
  },
  schemeIcon: {
    fontSize: 28,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  themePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  previewCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  previewChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
})
