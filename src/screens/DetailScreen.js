import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import Card from "../components/Card";

const DetailScreen = ({ route }) => {
  const { colors, spacing, typography } = useTheme();
  const { itemId } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Detail View" showBack={true} />
      <ScrollView contentContainerStyle={{ padding: spacing.m }}>
        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.headline,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.s,
            }}
          >
            Item Details
          </Text>
          <Text style={{ color: colors.text, fontSize: typography.sizes.body }}>
            You are viewing the details for item ID: {itemId || "N/A"}
          </Text>
        </Card>

        <Text
          style={{
            color: colors.text,
            lineHeight: 24,
            marginTop: spacing.m,
          }}
        >
          This screen demonstrates the use of a custom Header component with a
          back button functionality. The default navigation header has been
          hidden to allow for full custom styling control.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
