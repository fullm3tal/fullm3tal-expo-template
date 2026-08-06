import React from "react";
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from "react-native";

import { useAppTheme } from "@/theme/theming/useAppTheme";
import type { ColorRole, ThemeColors } from "@/theme/types/color";
import type { TypescaleKey } from "@/theme/types/typography";

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

/**
 * Props interface for the {@link TextWrapper} component.
 *
 * Extends every React Native `TextProps` property and adds theme-aware
 * shortcuts for typography variant and color role. All visual styling
 * should be applied via the standard `style` prop.
 */
export interface ITextWrapperProps extends RNTextProps {
  /**
   * Material 3 typescale variant to apply.
   * Maps to the `fonts` record from the current theme.
   *
   * @default "bodyMedium"
   */
  variant?: TypescaleKey;

  /**
   * A semantic color role from the active theme palette.
   * When provided, the text color is resolved from `theme.colors[color]`.
   *
   * @default "onSurface"
   */
  color?: ColorRole;

  /**
   * Additional styles applied **after** the theme variant and color,
   * allowing the consumer to override any resolved value.
   */
  style?: StyleProp<TextStyle>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * A theme-aware wrapper around React Native's `<Text>`.
 *
 * Applies the current theme's typescale variant and color role automatically
 * while forwarding every standard `TextProps` property. Use the `style` prop
 * for any visual overrides.
 *
 * @example
 * ```tsx
 * <TextWrapper variant="titleLarge" color="primary" style={{ textAlign: "center" }}>
 *   Hello World
 * </TextWrapper>
 *
 * <TextWrapper variant="bodySmall" color="onSurfaceVariant" numberOfLines={2}>
 *   Long paragraph that will be truncated…
 * </TextWrapper>
 * ```
 */
const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  ITextWrapperProps
>(
  (
    { variant = "bodyMedium", color = "onSurface", style, children, ...rest },
    ref,
  ) => {
    const { colors, fonts } = useAppTheme();

    const variantStyle = fonts[variant];
    const resolvedColor = colors[color as keyof ThemeColors];

    return (
      <RNText
        ref={ref}
        style={[variantStyle, { color: resolvedColor as string }, style]}
        allowFontScaling={false}
        {...rest}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = "Text";

export default Text;
