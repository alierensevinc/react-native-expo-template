import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const Header = ({ title, showBack = false, rightComponent }) => {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.m,
          paddingVertical: spacing.m,
          backgroundColor: colors.background,
        },
        leftContainer: {
          width: 40,
        },
        title: {
          color: colors.text,
          fontSize: typography.sizes.title,
          fontWeight: typography.weights.bold,
          textAlign: 'center',
          flex: 1,
        },
        rightContainer: {
          width: 40,
          alignItems: 'flex-end',
        },
      }),
    [colors, spacing, typography]
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

export default Header;
