import { Picker } from '@react-native-picker/picker';
import { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const Select = ({
  selectedValue,
  onValueChange,
  items,
  label,
  style,
  enabled = true,
}) => {
  const { colors, spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: spacing.s,
        },
        label: {
          color: colors.text,
          fontSize: typography.sizes.caption,
          marginBottom: spacing.xs,
        },
        pickerContainer: {
          backgroundColor: colors.surface,
          borderRadius: spacing.s,
          borderWidth: 1,
          borderColor: colors.disabled,
          overflow: 'hidden',
          justifyContent: 'center', // Important for centering picker content
          ...Platform.select({
            ios: {
              height: 120, // Increased height for iOS wheel
            },
            android: {
              height: 50,
            },
          }),
        },
        picker: {
          width: '100%',
          ...Platform.select({
            ios: {
              height: 120,
            },
            android: {
              height: 50,
            },
          }),
        },
      }),
    [colors, spacing, typography]
  );

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={enabled}
          style={styles.picker}
          dropdownIconColor={colors.text}
          itemStyle={{ color: colors.text, fontSize: 16, height: 120 }} // iOS item style
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color={colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Select;
