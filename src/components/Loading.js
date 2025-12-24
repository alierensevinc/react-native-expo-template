import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const Loading = ({ size = 'large', color }) => {
  const theme = useTheme();
  const rotation = useSharedValue(0);

  const spinnerColor = color || theme.colors.primary;
  const iconSize = size === 'small' ? 24 : size === 'large' ? 48 : 32;

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Ionicons name="reload" size={iconSize} color={spinnerColor} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Loading;
