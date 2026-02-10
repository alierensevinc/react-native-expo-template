import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const Badge = ({ content, color, size = 20, style, textStyle }) => {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          minWidth: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || colors.error,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 6,
        },
        text: {
          color: '#FFFFFF',
          fontSize: size * 0.6,
          fontWeight: 'bold',
        },
      }),
    [colors, size, color]
  );

  if (!content && content !== 0) return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{content}</Text>
    </View>
  );
};

export default Badge;
