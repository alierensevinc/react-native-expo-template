import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const Toggle = ({ value, onValueChange, style }) => {
  const theme = useTheme();

  // 0 for false, 1 for true
  const progress = useDerivedValue(() => {
    return withTiming(value ? 1 : 0, { duration: 200 });
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 50,
          height: 30,
          borderRadius: 15,
          padding: 2,
          justifyContent: 'center',
        },
        knob: {
          width: 26,
          height: 26,
          borderRadius: 13,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2.5,
          elevation: 4,
        },
      }),
    [theme]
  );

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.disabled, theme.colors.primary]
    );
    return {
      backgroundColor,
    };
  });

  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value * 20 }], // 50 (width) - 4 (padding*2) - 26 (knob) = 20 travel distance
    };
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.container, containerStyle, style]}>
        <Animated.View style={[styles.knob, knobStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Toggle;
