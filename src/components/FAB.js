import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const FAB = ({ icon, onPress, color, style, position = "bottom-right" }) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: "absolute",
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: color || theme.colors.secondary,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
          ...(position === "bottom-right" && {
            bottom: theme.spacing.l,
            right: theme.spacing.l,
          }),
          ...(position === "bottom-left" && {
            bottom: theme.spacing.l,
            left: theme.spacing.l,
          }),
          ...(position === "center" && {
            alignSelf: "center",
            bottom: theme.spacing.l,
          }),
        },
      }),
    [theme, color, position]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
        style,
      ]}
    >
      <Ionicons name={icon || "add"} size={24} color="#FFF" />
    </Pressable>
  );
};

export default FAB;
