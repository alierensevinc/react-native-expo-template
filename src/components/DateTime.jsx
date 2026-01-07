import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useMemo } from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const DateTime = ({
  value = new Date(),
  onChange,
  mode = 'date', // 'date', 'time', 'datetime'
  label,
  style,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

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
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.s,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
          padding: theme.spacing.s,
          height: 48,
        },
        text: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.body,
        },
        pickerContainer: {
          backgroundColor: theme.colors.surface,
          marginTop: 8,
          borderRadius: 8,
          overflow: 'hidden', // Contain the picker
        },
      }),
    [theme]
  );

  const handlePress = () => {
    if (Platform.OS === 'android') {
      setShow(true);
    } else {
      setShow(!show);
    }
  };

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    onChange(event, currentDate);
  };

  const formatDate = (date) => {
    if (mode === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString();
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      {Platform.OS === 'ios' ? (
        <View>
          <View style={styles.button}>
            <Text style={styles.text}>{formatDate(value)}</Text>
            <Pressable onPress={() => setShow(!show)}>
              <Ionicons
                name={show ? 'chevron-up' : 'calendar-outline'}
                size={20}
                color={theme.colors.primary}
              />
            </Pressable>
          </View>
          {show && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                testID="dateTimePicker"
                value={value}
                mode={mode}
                is24Hour
                display="spinner" // 'spinner' is safer/more constrained than 'inline' sometimes on older iOS or specific layouts
                onChange={handleChange}
                themeVariant={theme.dark ? 'dark' : 'light'}
                textColor={theme.colors.text} // Explicit text color if supported
                style={{ backgroundColor: theme.colors.surface, height: 120 }}
              />
            </View>
          )}
        </View>
      ) : (
        <>
          <Pressable onPress={handlePress} style={styles.button}>
            <Text style={styles.text}>{formatDate(value)}</Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={theme.colors.primary}
            />
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value}
              mode={mode}
              is24Hour
              display="default"
              onChange={handleChange}
            />
          )}
        </>
      )}
    </View>
  );
};

export default DateTime;
