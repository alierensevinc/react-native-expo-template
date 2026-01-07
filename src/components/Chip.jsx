import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Chip = ({
  label,
  onPress,
  onDelete,
  selected = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: selected
            ? theme.colors.primary
            : theme.colors.surface,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.m, // Increased horizontal padding for better look
          borderRadius: 16,
          borderWidth: 1,
          borderColor: selected ? theme.colors.primary : theme.colors.disabled,
          marginRight: theme.spacing.s,
          marginBottom: theme.spacing.s,
        },
        text: {
          color: selected ? 'white' : theme.colors.text,
          fontSize: theme.typography.sizes.caption,
          marginRight: onDelete ? 4 : 0,
        },
      }),
    [theme, selected, onDelete]
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
            color={selected ? 'white' : theme.colors.placeholder}
          />
        </Pressable>
      )}
    </AnimatedPressable>
  );
};

export default Chip;
