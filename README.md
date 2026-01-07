# React Native Expo Template

A modern, feature-rich starter template for building mobile apps with **Expo (SDK 54)**, **React Native (0.81)**, and **React (19)**.

This template comes pre-configured with the latest **React Navigation v7**, **Reanimated v4**, and essential libraries for state management, localization, storage, and more.

## 🚀 Features

- **Expo SDK 54**: The latest Expo SDK.
- **React Native 0.81**: Latest stable release.
- **React Navigation v7**: The newest version of the navigation library.
- **State Management**: **Zustand** for simple and scalable state management.
- **Form Validation**: **react-hook-form** + **zod** for easy and robust form handling.
- **Localization**: **i18next** & **react-i18next** pre-configured for multi-language support.
- **UI System**: A comprehensive set of 23+ theme-aware components (Buttons, Inputs, Modals, etc.).
- **Maps**: **react-native-maps** with **supercluster** and **react-native-map-clustering**.
- **Storage**: **react-native-mmkv** for fastest mobile key-value storage.
- **Animations**: **Reanimated 4**, **Gesture Handler** & **Skia** for high-performance graphics.
- **Performance**: **FlashList** for high-performance lists.
- **Utilities**: `expo-location`, `expo-notifications`, `axios`, `expo-linking`, `expo-haptics`, `expo-store-review` and more.

## 🎨 UI Component Library

This template includes a robust library of custom UI components.
Detailed usage instructions are available in [COMPONENTS.md](./COMPONENTS.md).

Includes:

- **Core**: Button, Input, Checkbox, Radio, Toggle, Chip, Segment
- **Display**: Card, Avatar, Badge, Header, Divider, Loading, ProgressBar
- **Feedback**: Alert, Toast, Modal, BottomSheet, EmptyState, Skeleton
- **Data**: FlashList integration, Select, DateTime, Range, SearchBar
- **Navigation**: FAB, ListItem
- **Forms**: FormInput (with validation)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (Latest LTS recommended)
- **iDS Simulator** (Mac only) or **Android Emulator** setup.

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alierensevinc/react-native-expo-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-native-expo-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the App

To start the development server:

```bash
npm start
# or
npx expo start
```

### Run on specific platforms:

- **iOS:**

  ```bash
  npm run ios
  ```

- **Android:**

  ```bash
  npm run android
  ```

- **Web:**
  ```bash
  npm run web
  ```

## 📦 Key Dependencies

| Package                      | Version  | Description              |
| :--------------------------- | :------- | :----------------------- |
| `expo`                       | ~54.0.30 | Core Expo SDK            |
| `react-native`               | 0.81.5   | Mobile Framework         |
| `@react-navigation/native`   | ^7.1.20  | Navigation (v7)          |
| `zustand`                    | ^5.0.8   | State Management         |
| `react-hook-form`            | ^7.69.0  | Form Library             |
| `zod`                        | ^4.2.1   | Schema Validation        |
| `i18next`                    | ^25.6.3  | Internationalization     |
| `react-native-mmkv`          | ^3.3.0   | High-performance Storage |
| `react-native-maps`          | 1.20.1   | Map Integration          |
| `react-native-reanimated`    | ~4.1.1   | Animations               |
| `@shopify/react-native-skia` | 2.2.12   | 2D Graphics              |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/alierensevinc/react-native-expo-template/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
