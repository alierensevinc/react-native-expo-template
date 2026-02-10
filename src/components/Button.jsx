import { useMemo } from 'react';
import { Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@context/ThemeContext';

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
  const { colors, spacing, typography } = useTheme();
  const scale = useSharedValue(1);

  const getBackgroundColor = () => {
    if (disabled) return colors.disabled;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.placeholder;
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return '#000000';
      case 'outline':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: spacing.m,
          paddingHorizontal: spacing.l,
          borderRadius: spacing.s,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? colors.primary : 'transparent',
          backgroundColor: getBackgroundColor(),
          flexDirection: 'row',
        },
        text: {
          color: getTextColor(),
          fontSize: typography.sizes.button,
          fontWeight: typography.weights.medium,
        },
      }),
    [colors, spacing, typography, variant, disabled]
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
