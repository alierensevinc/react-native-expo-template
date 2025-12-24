import { Picker } from '@react-native-picker/picker';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const Select = ({
  selectedValue,
  onValueChange,
  items,
  label,
  style,
  enabled = true,
}) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: theme.spacing.s,
        },
        label: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.caption,
          marginBottom: theme.spacing.xs,
        },
        pickerContainer: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.s,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
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
    [theme]
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
          dropdownIconColor={theme.colors.text}
          itemStyle={{ color: theme.colors.text, fontSize: 16, height: 120 }} // iOS item style
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color={theme.colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Select;
