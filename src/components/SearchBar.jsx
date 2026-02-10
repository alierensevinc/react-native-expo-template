import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const SearchBar = ({ value, onChangeText, placeholder, onClear, style }) => {
  const { colors, spacing, typography } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: spacing.s,
          paddingHorizontal: spacing.s,
          height: 48,
          borderWidth: 1,
          borderColor: colors.disabled,
        },
        input: {
          flex: 1,
          marginLeft: spacing.s,
          color: colors.text,
          fontSize: typography.sizes.body,
        },
      }),
    [colors, spacing, typography]
  );

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color={colors.placeholder} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor={colors.placeholder}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={20} color={colors.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
