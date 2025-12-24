import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
}) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing.xl,
        },
        title: {
          color: theme.colors.text,
          fontSize: theme.typography.sizes.title,
          fontWeight: theme.typography.weights.bold,
          marginTop: theme.spacing.m,
          textAlign: "center",
        },
        description: {
          color: theme.colors.placeholder,
          fontSize: theme.typography.sizes.body,
          marginTop: theme.spacing.s,
          marginBottom: theme.spacing.l,
          textAlign: "center",
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name={icon || "file-tray-outline"}
        size={64}
        color={theme.colors.disabled}
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
