import { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const Avatar = ({
  source,
  initials,
  size = 40,
  onPress,
  style,
  backgroundColor,
}) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor || theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        image: {
          width: '100%',
          height: '100%',
        },
        text: {
          color: '#FFFFFF',
          fontSize: size * 0.4,
          fontWeight: theme.typography.weights.medium,
        },
      }),
    [theme, size, backgroundColor]
  );

  const content = (
    <View style={[styles.container, style]}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.text}>
          {initials ? initials.substring(0, 2).toUpperCase() : '?'}
        </Text>
      )}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};

export default Avatar;
