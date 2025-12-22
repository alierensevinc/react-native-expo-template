import { Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          color: colors.primary,
          fontSize: typography.sizes.headline,
          marginBottom: spacing.m,
        }}
      >
        {t("home.title")}
      </Text>
      <Text style={{ color: colors.text }}>Theme Integration Works!</Text>
    </Animated.View>
  );
}
