import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const ListItem = ({
  left,
  title,
  subtitle,
  right,
  onPress,
  style,
  divider,
}) => {
  const { colors, spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: spacing.m,
          backgroundColor: colors.surface,
          borderBottomWidth: divider ? 1 : 0,
          borderBottomColor: colors.disabled,
        },
        content: {
          flex: 1,
          marginHorizontal: spacing.m,
        },
        title: {
          color: colors.text,
          fontSize: typography.sizes.body,
          fontWeight: typography.weights.medium,
        },
        subtitle: {
          color: colors.placeholder,
          fontSize: typography.sizes.caption,
          marginTop: 2,
        },
      }),
    [colors, spacing, typography, divider]
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
        <Ionicons name="chevron-forward" size={20} color={colors.placeholder} />
      ) : null}
    </Pressable>
  );
};

export default ListItem;
