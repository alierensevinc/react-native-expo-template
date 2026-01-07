import { useMemo } from 'react';
import { Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.placeholder;
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return '#000000';
      case 'outline':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: theme.spacing.m,
          paddingHorizontal: theme.spacing.l,
          borderRadius: theme.spacing.s,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor:
            variant === 'outline' ? theme.colors.primary : 'transparent',
          backgroundColor: getBackgroundColor(),
          flexDirection: 'row',
        },
        text: {
          color: getTextColor(),
          fontSize: theme.typography.sizes.button,
          fontWeight: theme.typography.weights.medium,
        },
      }),
    [theme, variant, disabled]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!loading && !disabled) {
      scale.value = withSpring(0.95);
    }
  };

  const handlePressOut = () => {
    if (!loading && !disabled) {
      scale.value = withSpring(1);
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={loading || disabled}
      style={[styles.container, animatedStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
};

export default Button;
