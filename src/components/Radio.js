import React, { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const Radio = ({ selected, onChange, label, style }) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: theme.spacing.xs,
        },
        outerCircle: {
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing.s,
        },
        innerCircle: {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: theme.colors.primary,
        },
        label: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
        },
      }),
    [theme]
  );

  const outerStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        selected ? theme.colors.primary : theme.colors.disabled,
        { duration: 200 }
      ),
    };
  });

  const innerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(selected ? 1 : 0) }],
    };
  });

  return (
    <Pressable
      onPress={() => onChange(!selected)}
      style={[styles.container, style]}
    >
      <Animated.View style={[styles.outerCircle, outerStyle]}>
        <Animated.View style={[styles.innerCircle, innerStyle]} />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

export default Radio;
