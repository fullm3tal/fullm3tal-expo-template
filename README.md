# fullm3tal-expo-template 🚀

A modern [Expo](https://expo.dev) project template built with **React Native**, **Expo Router**, and a curated set of production-ready packages.

---

## 📦 Installed Packages

### Core

| Package | Version | Description |
|---|---|---|
| [`expo`](https://docs.expo.dev/) | `~56.0.12` | The Expo SDK — the core framework powering this app |
| [`react`](https://react.dev/) | `19.2.3` | The React library for building UIs |
| [`react-native`](https://reactnative.dev/) | `0.85.3` | The React Native runtime for iOS & Android |
| [`react-dom`](https://react.dev/reference/react-dom) | `19.2.3` | React renderer for web support |
| [`react-native-web`](https://necolas.github.io/react-native-web/) | `~0.21.0` | Run React Native components on the web |

---

### Navigation

| Package | Version | Description |
|---|---|---|
| [`expo-router`](https://docs.expo.dev/router/introduction/) | `~56.2.11` | File-based routing for Expo apps (iOS, Android & Web) |
| [`expo-linking`](https://docs.expo.dev/versions/v56.0.0/sdk/linking/) | `~56.0.14` | Deep linking and universal URL handling |

---

### UI & Styling

| Package | Version | Description |
|---|---|---|
| [`@expo/ui`](https://docs.expo.dev/versions/v56.0.0/sdk/ui/) | `~56.0.18` | Expo's native UI component primitives |
| [`expo-symbols`](https://docs.expo.dev/versions/v56.0.0/sdk/symbols/) | `~56.0.6` | SF Symbols support for iOS |
| [`expo-glass-effect`](https://docs.expo.dev/versions/v56.0.0/sdk/glass-effect/) | `~56.0.4` | Native glassmorphism / blur effects |
| [`expo-image`](https://docs.expo.dev/versions/v56.0.0/sdk/image/) | `~56.0.11` | High-performance image component with caching & transitions |

---

### Animations & Gestures

| Package | Version | Description |
|---|---|---|
| [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/) | `4.3.1` | Smooth, performant animations running on the UI thread |
| [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/) | `~2.31.1` | Native-driven gesture recognition system |
| [`react-native-worklets`](https://github.com/margelo/react-native-worklets) | `0.8.3` | Shared worklets runtime for Reanimated & other libraries |

---

### Layout & Safe Areas

| Package | Version | Description |
|---|---|---|
| [`react-native-screens`](https://github.com/software-mansion/react-native-screens) | `4.25.2` | Native navigation container primitives |
| [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context) | `~5.7.0` | Safe area insets for notches, home indicators, etc. |

---

### Expo SDK Modules

| Package | Version | Description |
|---|---|---|
| [`expo-constants`](https://docs.expo.dev/versions/v56.0.0/sdk/constants/) | `~56.0.18` | Access app configuration and device constants |
| [`expo-device`](https://docs.expo.dev/versions/v56.0.0/sdk/device/) | `~56.0.4` | Device hardware info (model, OS version, etc.) |
| [`expo-font`](https://docs.expo.dev/versions/v56.0.0/sdk/font/) | `~56.0.7` | Load and use custom fonts |
| [`expo-splash-screen`](https://docs.expo.dev/versions/v56.0.0/sdk/splash-screen/) | `~56.0.10` | Control the native splash screen display |
| [`expo-status-bar`](https://docs.expo.dev/versions/v56.0.0/sdk/status-bar/) | `~56.0.4` | Manage the status bar appearance |
| [`expo-system-ui`](https://docs.expo.dev/versions/v56.0.0/sdk/system-ui/) | `~56.0.5` | Control system-level UI (background color, etc.) |
| [`expo-web-browser`](https://docs.expo.dev/versions/v56.0.0/sdk/webbrowser/) | `~56.0.5` | Open URLs in an in-app browser |

---

### Dev Dependencies

| Package | Version | Description |
|---|---|---|
| [`typescript`](https://www.typescriptlang.org/) | `~6.0.3` | TypeScript compiler for type-safe development |
| [`@types/react`](https://www.npmjs.com/package/@types/react) | `~19.2.2` | TypeScript types for React |

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Start the development server**

   ```bash
   yarn start
   ```

3. **Run on a specific platform**

   ```bash
   yarn android   # Android emulator or device
   yarn ios       # iOS simulator or device
   yarn web       # Browser
   ```

---

## 🗂 Project Structure

```
fullm3tal-expo-template/
├── app/          # File-based routes (expo-router)
├── assets/       # Static assets (fonts, images)
├── scripts/      # Utility scripts
├── src/          # Shared source code (components, hooks, etc.)
├── app.json      # Expo app configuration
├── package.json  # Project dependencies
└── tsconfig.json # TypeScript configuration
```

---

## 🔧 Useful Scripts

| Script | Command | Description |
|---|---|---|
| Start | `yarn start` | Start the Expo dev server |
| Android | `yarn android` | Run on Android |
| iOS | `yarn ios` | Run on iOS |
| Web | `yarn web` | Run in the browser |
| Lint | `yarn lint` | Run Expo's ESLint checks |
| Reset | `yarn reset-project` | Reset to a blank project scaffold |

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Expo on GitHub](https://github.com/expo/expo)
- [Discord Community](https://chat.expo.dev)
