import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';
import { useTheme } from '@context/ThemeContext';

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xl,
        },
        title: {
          color: colors.text,
          fontSize: typography.sizes.title,
          fontWeight: typography.weights.bold,
          marginTop: spacing.m,
          textAlign: 'center',
        },
        description: {
          color: colors.placeholder,
          fontSize: typography.sizes.body,
          marginTop: spacing.s,
          marginBottom: spacing.l,
          textAlign: 'center',
        },
      }),
    [colors, spacing, typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name={icon || 'file-tray-outline'}
        size={64}
        color={colors.disabled}
      />
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} variant="outline" />
      )}
    </View>
  );
};

export default EmptyState;
