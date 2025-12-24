import React, { useMemo } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = ({ children, style, onPress, ...props }) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const containerStyle = useMemo(() => {
    return [
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.spacing.m,
        padding: theme.spacing.m,
        shadowColor: theme.colors.text,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
      style,
    ];
  }, [theme, style]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[containerStyle, animatedStyle]}
        {...props}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={containerStyle} {...props}>
      {children}
    </Animated.View>
  );
};

export default Card;
