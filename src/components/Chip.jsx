import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@context/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Chip = ({
  label,
  onPress,
  onDelete,
  selected = false,
  style,
  textStyle,
}) => {
  const { colors, spacing, typography } = useTheme();
  const scale = useSharedValue(1);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: selected ? colors.primary : colors.surface,
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.m, // Increased horizontal padding for better look
          borderRadius: 16,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.disabled,
          marginRight: spacing.s,
          marginBottom: spacing.s,
        },
        text: {
          color: selected ? 'white' : colors.text,
          fontSize: typography.sizes.caption,
          marginRight: onDelete ? 4 : 0,
        },
      }),
    [colors, spacing, typography, selected, onDelete]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle, style]}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8}>
          <Ionicons
            name="close-circle"
            size={16}
            color={selected ? 'white' : colors.placeholder}
          />
        </Pressable>
      )}
    </AnimatedPressable>
  );
};

export default Chip;
