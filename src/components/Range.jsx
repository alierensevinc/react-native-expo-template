import Slider from '@react-native-community/slider';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const Range = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  label,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: spacing.s,
        },
        labelContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: spacing.xs,
        },
        label: {
          color: colors.text,
          fontSize: typography.sizes.caption,
        },
        value: {
          color: colors.primary,
          fontSize: typography.sizes.caption,
          fontWeight: 'bold',
        },
      }),
    [colors, spacing, typography]
  );

  return (
    <View style={[styles.container, style]}>
      {(label || value !== undefined) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {value !== undefined && <Text style={styles.value}>{value}</Text>}
        </View>
      )}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.disabled}
        thumbTintColor={colors.primary}
      />
    </View>
  );
};

export default Range;
