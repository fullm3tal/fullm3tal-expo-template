import React from 'react'
import {StyleSheet, Text, View, Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import {useAppTheme} from '@/shared/theme/theming/use-app-theme'
import {useTranslation} from 'react-i18next'

export function SignUpScreen() {
  const {colors, fonts} = useAppTheme()
  const {t} = useTranslation()
  const router = useRouter()

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[fonts.headlineMedium, {color: colors.onBackground}]}>
        {t('sign_up_title')}
      </Text>
      <Text style={[fonts.bodyMedium, {color: colors.onSurfaceVariant, marginTop: 16}]}>
        (Stub Screen)
      </Text>
      
      <Pressable onPress={() => router.back()} style={{marginTop: 32}}>
        <Text style={[fonts.bodyMedium, {color: colors.primary as string}]}>
          Go Back
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
    alignItems: 'center',
  },
})
