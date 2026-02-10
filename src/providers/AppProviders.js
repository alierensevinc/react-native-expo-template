import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';

// Contexts
import { QueryProvider } from '@context/QueryProvider';
import { ThemeProvider } from '@context/ThemeContext';

export default function AppProviders({ children }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              {children}
              <Toast />
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
