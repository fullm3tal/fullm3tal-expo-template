import {Controller} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {useRouter} from 'expo-router'
import {useAppTheme} from '@/shared/theme/theming/use-app-theme'
import type {ErrorResponse} from '@/shared/types/remote/error-response'
import {useSignIn} from './use-sign-in'

export function SignInScreen() {
  const {colors, fonts, shapes} = useAppTheme()
  const {t} = useTranslation()
  const router = useRouter()
  const {form, onSubmit, isPending, error} = useSignIn()

  const apiError = error as ErrorResponse | null

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[fonts.headlineMedium, {color: colors.onBackground}]}>
          {t('sign_in_title')}
        </Text>
        <Text
          style={[
            fonts.bodyMedium,
            {color: colors.onSurfaceVariant, marginTop: 4},
          ]}
        >
          {t('sign_in_subtitle')}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email */}
        <Controller
          control={form.control}
          name="email"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
            <View>
              <Text style={[fonts.labelLarge, {color: colors.onSurface, marginBottom: 6}]}>
                {t('sign_in_email_label')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: fieldError ? colors.error : colors.outline,
                    backgroundColor: colors.surfaceContainerHigh,
                    color: colors.onSurface,
                    borderRadius: shapes.corner.extraSmall,
                  },
                ]}
                placeholder="you@example.com"
                placeholderTextColor={colors.onSurfaceVariant as string}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          )}
        />

        {/* Password */}
        <Controller
          control={form.control}
          name="password"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
            <View>
              <Text style={[fonts.labelLarge, {color: colors.onSurface, marginBottom: 6}]}>
                {t('sign_in_password_label')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: fieldError ? colors.error : colors.outline,
                    backgroundColor: colors.surfaceContainerHigh,
                    color: colors.onSurface,
                    borderRadius: shapes.corner.extraSmall,
                  },
                ]}
                placeholder="••••••••"
                placeholderTextColor={colors.onSurfaceVariant as string}
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          )}
        />

        {/* API error */}
        {apiError?.message ? (
          <Text style={[fonts.bodySmall, {color: colors.error}]}>
            {apiError.message}
          </Text>
        ) : null}

        {/* Submit */}
        <Pressable
          onPress={onSubmit}
          disabled={isPending}
          style={[
            styles.button,
            {
              backgroundColor: isPending ? colors.surfaceContainerHigh : colors.primary,
              borderRadius: 9999,
            },
          ]}
        >
          {isPending ? (
            <ActivityIndicator color={colors.onPrimary as string} />
          ) : (
            <Text style={[fonts.labelLarge, {color: colors.onPrimary}]}>
              {t('sign_in_submit')}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Sign-up CTA */}
      <Pressable onPress={() => router.push('/(auth)/sign-up' as any)} style={styles.cta}>
        <Text style={[fonts.bodyMedium, {color: colors.onSurfaceVariant}]}>
          {t('sign_up_cta')}{' '}
          <Text style={{color: colors.primary as string}}>{t('sign_up_title')}</Text>
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 72,
    gap: 32,
  },
  header: {
    gap: 4,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  cta: {
    alignItems: 'center',
  },
})
