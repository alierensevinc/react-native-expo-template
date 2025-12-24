import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const Skeleton = ({ width, height, radius, style, variant = "rect" }) => {
  const theme = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 500 }),
        withTiming(0.7, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: width || "100%",
    height: height || 20,
    backgroundColor: theme.colors.disabled,
    borderRadius: variant === "circle" ? (width || height) / 2 : radius || 4,
  };

  return <Animated.View style={[baseStyle, animatedStyle, style]} />;
};

export default Skeleton;
