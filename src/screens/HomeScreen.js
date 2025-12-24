import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/Card";
import Header from "../components/Header";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Component Demo" showBack={false} />
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: spacing.m,
            gap: spacing.m,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.headline,
              fontWeight: typography.weights.bold,
            }}
          >
            {t("home.title")}
          </Text>

          <Card>
            <Text
              style={{
                color: colors.text,
                fontSize: typography.sizes.title,
                marginBottom: spacing.s,
                fontWeight: typography.weights.bold,
              }}
            >
              Card Title
            </Text>
            <Text style={{ color: colors.text, lineHeight: 20 }}>
              This is a reusable Card component with shadow and press animation.
              It uses useMemo for styles and reanimated for interactions.
            </Text>
          </Card>

          <Card onPress={() => navigation.navigate("Detail", { itemId: 42 })}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Go to Detail Screen
            </Text>
            <Text style={{ color: colors.text, marginTop: spacing.s }}>
              Tap me to test navigation and see the custom back button!
            </Text>
          </Card>

          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.title,
              marginTop: spacing.m,
            }}
          >
            Buttons
          </Text>

          <Button
            title="Primary Button"
            onPress={() => console.log("Primary pressed")}
            variant="primary"
          />

          <Button
            title="Secondary Button"
            onPress={() => console.log("Secondary pressed")}
            variant="secondary"
          />

          <Button
            title="Outline Button"
            onPress={() => console.log("Outline pressed")}
            variant="outline"
          />

          <Button
            title="Loading State"
            loading={true}
            onPress={() => {}}
            variant="primary"
          />

          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.title,
              marginTop: spacing.m,
            }}
          >
            Loading Component
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: colors.surface,
              padding: spacing.m,
              borderRadius: spacing.m,
            }}
          >
            <Loading size="small" />
            <Loading size="medium" />
            <Loading size="large" color={colors.secondary} />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
