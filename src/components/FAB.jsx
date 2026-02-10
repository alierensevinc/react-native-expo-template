import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const FAB = ({ icon, onPress, color, style, position = 'bottom-right' }) => {
  const { colors, spacing } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: color || colors.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
          ...(position === 'bottom-right' && {
            bottom: spacing.l,
            right: spacing.l,
          }),
          ...(position === 'bottom-left' && {
            bottom: spacing.l,
            left: spacing.l,
          }),
          ...(position === 'center' && {
            alignSelf: 'center',
            bottom: spacing.l,
          }),
        },
      }),
    [colors, spacing, color, position]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
        style,
      ]}
    >
      <Ionicons name={icon || 'add'} size={24} color="#FFF" />
    </Pressable>
  );
};

export default FAB;
