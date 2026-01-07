import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const Header = ({ title, showBack = false, rightComponent }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.m,
          backgroundColor: theme.colors.background,
        },
        leftContainer: {
          width: 40,
        },
        title: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.title,
          fontWeight: theme.typography.weights.bold,
          textAlign: 'center',
          flex: 1,
        },
        rightContainer: {
          width: 40,
          alignItems: 'flex-end',
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

export default Header;
