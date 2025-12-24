import React, { useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const ProgressBar = ({ progress = 0, color, style, height = 8 }) => {
  const theme = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(Math.max(0, Math.min(progress, 1)) * 100, {
      duration: 500,
    });
  }, [progress]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height,
          backgroundColor: theme.colors.disabled,
          borderRadius: height / 2,
          overflow: 'hidden',
          width: '100%',
        },
        fill: {
          height: '100%',
          backgroundColor: color || theme.colors.primary,
          borderRadius: height / 2,
        },
      }),
    [theme, height, color]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.fill, animatedStyle]} />
    </View>
  );
};

export default ProgressBar;
