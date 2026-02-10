import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '@context/ThemeContext';

const Divider = ({ orientation = 'horizontal', width = 1, color, style }) => {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        divider: {
          backgroundColor: color || colors.disabled,
          ...(orientation === 'horizontal'
            ? { width: '100%', height: width }
            : { width, height: '100%' }),
        },
      }),
    [colors, orientation, width, color]
  );

  return <View style={[styles.divider, style]} />;
};

export default Divider;
