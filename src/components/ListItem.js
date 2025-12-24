import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const ListItem = ({
  left,
  title,
  subtitle,
  right,
  onPress,
  style,
  divider,
}) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.m,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: divider ? 1 : 0,
          borderBottomColor: theme.colors.disabled,
        },
        content: {
          flex: 1,
          marginHorizontal: theme.spacing.m,
        },
        title: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
          fontWeight: theme.typography.weights.medium,
        },
        subtitle: {
          color: theme.colors.placeholder,
          fontSize: theme.typography.sizes.caption,
          marginTop: 2,
        },
      }),
    [theme, divider]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed && onPress ? 0.7 : 1 },
        style,
      ]}
      disabled={!onPress}
    >
      {left && <View>{left}</View>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right ? (
        <View>{right}</View>
      ) : onPress ? (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.placeholder}
        />
      ) : null}
    </Pressable>
  );
};

export default ListItem;
