import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Home" showBack={false} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}>
          Welcome
        </Text>
      </View>
    </SafeAreaView>
  );
}
