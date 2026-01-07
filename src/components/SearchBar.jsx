import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ value, onChangeText, placeholder, onClear, style }) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.s,
          paddingHorizontal: theme.spacing.s,
          height: 48,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
        },
        input: {
          flex: 1,
          marginLeft: theme.spacing.s,
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color={theme.colors.placeholder} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor={theme.colors.placeholder}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons
            name="close-circle"
            size={20}
            color={theme.colors.placeholder}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
