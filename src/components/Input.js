import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // We rely on props.value to determine if label should float when not focused
  const hasValue = props.value && props.value.length > 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: theme.spacing.m,
          height: 56, // Fixed height to prevent layout jumps
          justifyContent: "center",
        },
        inputContainer: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: theme.spacing.s,
          paddingHorizontal: theme.spacing.s,
          height: 48,
          backgroundColor: theme.colors.surface,
        },
        input: {
          flex: 1,
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
          paddingHorizontal: theme.spacing.s,
        },
        label: {
          position: "absolute",
          left: theme.spacing.s + (leftIcon ? 24 : 0),
          backgroundColor: theme.colors.surface,
          paddingHorizontal: 4,
          zIndex: 1,
        },
        errorText: {
          color: theme.colors.error,
          fontSize: theme.typography.sizes.caption,
          marginTop: 4,
          marginLeft: 4,
        },
      }),
    [theme, leftIcon]
  );

  const animatedLabelStyle = useAnimatedStyle(() => {
    const shouldFloat = isFocused || hasValue;
    return {
      top: withTiming(shouldFloat ? -10 : 13, { duration: 200 }), // Adjusted top values
      fontSize: withTiming(
        shouldFloat
          ? theme.typography.sizes.caption
          : theme.typography.sizes.body,
        { duration: 200 }
      ),
      color: withTiming(
        error
          ? theme.colors.error
          : isFocused
          ? theme.colors.primary
          : theme.colors.placeholder,
        { duration: 200 }
      ),
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        error
          ? theme.colors.error
          : isFocused
          ? theme.colors.primary
          : theme.colors.disabled,
        { duration: 200 }
      ),
    };
  });

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}
      <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
        {leftIcon && <View>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          placeholderTextColor="transparent" // Hide placeholder for floating label effect or use theme.colors.placeholder if you want both
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
