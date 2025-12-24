import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';

import { useTheme } from '../context/ThemeContext';

const Accordion = ({ title, children, style }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const heightValue = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Basic estimated height for content or strict measurement if possible
  // For simplicity in this demo, we'll toggle between 0 and a sufficient max height/measurement logic
  // A common Reanimated pattern for dynamic height often involves measuring or using a layout transition.
  // Here we will use a LayoutAnimation approach for simplicity or max-height estimation if content is text.
  // However, `measure` on UI thread is more robust but complex.
  // Let's use a simpler `layout` prop on the container for auto-animation if available,
  // or just toggle opacity/display for a basic version, OR best: use `Layout` prop from Reanimated.

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    rotation.value = withTiming(isOpen ? 0 : 180);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.s,
          overflow: 'hidden',
          marginBottom: theme.spacing.s,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing.m,
        },
        title: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
          fontWeight: theme.typography.weights.medium,
        },
        content: {
          padding: theme.spacing.m,
          borderTopWidth: 1,
          borderTopColor: theme.colors.disabled,
        },
      }),
    [theme]
  );

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={20} color={theme.colors.text} />
        </Animated.View>
      </Pressable>
      {isOpen && (
        <Animated.View
          entering={FadeInUp.duration(300)}
          exiting={FadeOutUp.duration(200)}
          style={styles.content}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
};

export default Accordion;
