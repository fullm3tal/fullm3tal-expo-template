import { ConfigContext, ExpoConfig } from "@expo/config";

const IS_PRODUCTION = process.env.APP_VARIANT === "production";
const IS_STAGING = process.env.APP_VARIANT === "staging";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_PRODUCTION) {
    return "com.azurebeyond.prod";
  }
  if (IS_STAGING) {
    return "com.azurebeyond.staging";
  }
  if (IS_PREVIEW) {
    return "com.azurebeyond.preview";
  }
  return "com.azurebeyond.dev";
};

const getAppName = () => {
  if (IS_PRODUCTION) {
    return "Azure Beyond";
  }
  if (IS_STAGING) {
    return "Azure Beyond (Staging)";
  }
  if (IS_PREVIEW) {
    return "Azure Beyond (Preview)";
  }
  return "Azure Beyond (Dev)";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "fullm3tal-expo-template",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "fullm3talexpotemplate",
  userInterfaceStyle: "automatic",
  ios: {
    icon: "./assets/expo.icon",
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        android: {
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    appVariant: process.env.APP_VARIANT,
    isDarkAllowed: process.env.IS_DARK_ALLOWED === "true",
    eas: {
      projectId: "bed172d6-2042-411d-b8be-b451871b274c",
    },
  },
});
