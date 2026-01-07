import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// eslint-disable-next-line import/namespace
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import './src/i18n';
import { QueryProvider } from '@context/QueryProvider';
import { ThemeProvider, useTheme } from '@context/ThemeContext';
import HomeScreen from '@screens/HomeScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Montserrat-Black': require('./assets/fonts/montserrat/Montserrat-Black.ttf'),
          'Montserrat-BlackItalic': require('./assets/fonts/montserrat/Montserrat-BlackItalic.ttf'),
          'Montserrat-Bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
          'Montserrat-BoldItalic': require('./assets/fonts/montserrat/Montserrat-BoldItalic.ttf'),
          'Montserrat-ExtraBold': require('./assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
          'Montserrat-ExtraBoldItalic': require('./assets/fonts/montserrat/Montserrat-ExtraBoldItalic.ttf'),
          'Montserrat-ExtraLight': require('./assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
          'Montserrat-ExtraLightItalic': require('./assets/fonts/montserrat/Montserrat-ExtraLightItalic.ttf'),
          'Montserrat-Italic': require('./assets/fonts/montserrat/Montserrat-Italic.ttf'),
          'Montserrat-Light': require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
          'Montserrat-LightItalic': require('./assets/fonts/montserrat/Montserrat-LightItalic.ttf'),
          'Montserrat-Medium': require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
          'Montserrat-MediumItalic': require('./assets/fonts/montserrat/Montserrat-MediumItalic.ttf'),
          'Montserrat-Regular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
          'Montserrat-SemiBold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
          'Montserrat-SemiBoldItalic': require('./assets/fonts/montserrat/Montserrat-SemiBoldItalic.ttf'),
          'Montserrat-Thin': require('./assets/fonts/montserrat/Montserrat-Thin.ttf'),
          'Montserrat-ThinItalic': require('./assets/fonts/montserrat/Montserrat-ThinItalic.ttf'),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <SafeAreaProvider>
          <QueryProvider>
            <BottomSheetModalProvider>
              <ThemedStatusBar />
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </QueryProvider>
        </SafeAreaProvider>
      </ThemeProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
