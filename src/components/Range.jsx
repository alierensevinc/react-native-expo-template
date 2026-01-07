import Slider from '@react-native-community/slider';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const Range = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  label,
  style,
}) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: theme.spacing.s,
        },
        labelContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.xs,
        },
        label: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.caption,
        },
        value: {
          color: theme.colors.primary,
          fontSize: theme.typography.sizes.caption,
          fontWeight: 'bold',
        },
      }),
    [theme]
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
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.disabled}
        thumbTintColor={theme.colors.primary}
      />
    </View>
  );
};

export default Range;
