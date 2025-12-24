import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../context/ThemeContext";
import Card from "../components/Card";
import Header from "../components/Header";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, spacing, typography, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Home" showBack={false} />

      <View style={{ padding: spacing.m }}>
        {/* Theme Toggle */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.l,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.headline,
              fontWeight: typography.weights.bold,
            }}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? colors.primary : "#f4f3f4"}
            trackColor={{ false: "#767577", true: colors.secondary }}
          />
        </View>

        {/* Navigation to Components */}
        <Card onPress={() => navigation.navigate("Components")}>
          <Text
            style={{
              color: colors.primary,
              fontSize: typography.sizes.title,
              fontWeight: typography.weights.bold,
              textAlign: "center",
            }}
          >
            View All Components
          </Text>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              marginTop: spacing.s,
            }}
          >
            Tap here to explore the UI Component Library variations.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
