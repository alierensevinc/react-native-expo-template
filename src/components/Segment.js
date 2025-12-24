import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const Segment = ({ options, selectedIndex, onChange, style }) => {
  const theme = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const segmentWidth = containerWidth
    ? (containerWidth - 4) / options.length
    : 0; // -4 for padding

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.s,
          padding: 2,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
          height: 40,
        },
        slider: {
          position: "absolute",
          top: 2,
          bottom: 2,
          left: 2,
          backgroundColor: theme.colors.primary,
          borderRadius: theme.spacing.s - 2,
        },
        item: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.spacing.s - 2,
          zIndex: 1,
        },
        text: {
          fontSize: theme.typography.sizes.caption,
          fontWeight: theme.typography.weights.medium,
          color: theme.colors.text,
        },
        selectedText: {
          color: "white",
        },
      }),
    [theme]
  );

  const sliderStyle = useAnimatedStyle(() => {
    if (!segmentWidth) return { opacity: 0 };
    return {
      width: segmentWidth,
      transform: [{ translateX: withSpring(selectedIndex * segmentWidth) }],
      opacity: 1,
    };
  });

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.slider, sliderStyle]} />
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={index}
            onPress={() => onChange(index)}
            style={styles.item}
          >
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Segment;
