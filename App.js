import React from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n';

import useCachedResources from '@hooks/useCachedResources';
import AppProviders from '@providers/AppProviders';
import AppNavigator from '@navigation/AppNavigator';
import { useTheme } from '@context/ThemeContext';

const ThemedStatusBar = () => {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <AppProviders>
      <ThemedStatusBar />
      <AppNavigator />
    </AppProviders>
  );
}
