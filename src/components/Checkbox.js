import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const Checkbox = ({ checked, onChange, label, style }) => {
  const theme = useTheme();

  // Derived value: 0 -> unchecked, 1 -> checked
  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0, { duration: 200 });
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: theme.spacing.xs,
        },
        box: {
          width: 24,
          height: 24,
          borderRadius: 4,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing.s,
        },
        label: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
        },
      }),
    [theme]
  );

  const animatedBoxStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', theme.colors.primary]
    );

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.disabled, theme.colors.primary]
    );

    return {
      backgroundColor,
      borderColor,
    };
  });

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={[styles.container, style]}
    >
      <Animated.View style={[styles.box, animatedBoxStyle]}>
        {checked && (
          <Animated.View entering={ZoomIn} exiting={ZoomOut}>
            <Ionicons name="checkmark" size={16} color="white" />
          </Animated.View>
        )}
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

export default Checkbox;
