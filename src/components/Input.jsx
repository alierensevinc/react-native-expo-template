import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import { useTheme } from '@context/ThemeContext';

const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  style,
  value,
  onChangeText,
  ...props
}) => {
  const { colors, spacing, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle controlled vs uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;
  const hasValue = currentValue.length > 0;

  // Toggle for secure entry
  const isSecure = secureTextEntry && !isPasswordVisible;

  const handleTextChange = (text) => {
    setInternalValue(text);
    if (onChangeText) onChangeText(text);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: spacing.m,
        },
        inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: spacing.s,
          paddingHorizontal: spacing.s,
          height: 56, // Increased height for better interaction and label space
          backgroundColor: colors.surface,
        },
        input: {
          flex: 1,
          color: colors.text,
          fontSize: typography.sizes.body,
          paddingHorizontal: spacing.s,
          paddingTop: label ? 18 : 0, // Push text down if label exists
          height: '100%',
        },
        labelContainer: {
          position: 'absolute',
          left: leftIcon ? 40 : 12, // Adjust based on icon
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          pointerEvents: 'none', // Let clicks pass through to input
        },
        label: {
          fontSize: typography.sizes.body,
        },
        errorText: {
          color: colors.error,
          fontSize: typography.sizes.caption,
          marginTop: 4,
          marginLeft: 4,
        },
        iconContainer: {
          width: 24,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [colors, spacing, typography, leftIcon, label]
  );

  const animatedLabelStyle = useAnimatedStyle(() => {
    const shouldFloat = isFocused || hasValue;
    return {
      transform: [
        { translateY: withTiming(shouldFloat ? -12 : 0, { duration: 200 }) },
      ],
      fontSize: withTiming(
        shouldFloat ? typography.sizes.caption : typography.sizes.body,
        { duration: 200 }
      ),
      color: withTiming(
        error ? colors.error : isFocused ? colors.primary : colors.placeholder,
        { duration: 200 }
      ),
    };
  });

  const animatedBorderColors = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      error ? 2 : isFocused ? 1 : 0,
      [0, 1, 2],
      [colors.disabled, colors.primary, colors.error]
    );

    return {
      borderColor,
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.inputContainer, animatedBorderColors]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <View style={{ flex: 1 }}>
          {label && (
            <View style={styles.labelContainer}>
              <Animated.Text style={[styles.label, animatedLabelStyle]}>
                {label}
              </Animated.Text>
            </View>
          )}
          <TextInput
            style={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={currentValue}
            onChangeText={handleTextChange}
            secureTextEntry={isSecure}
            {...props}
          />
        </View>

        {secureTextEntry ? (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconContainer}
            hitSlop={10}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.placeholder}
            />
          </Pressable>
        ) : rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.iconContainer}>
            {rightIcon}
          </Pressable>
        ) : null}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
