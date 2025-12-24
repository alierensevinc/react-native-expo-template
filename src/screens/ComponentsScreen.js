import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

const COMPONENT_LIST = [
  { id: "Accordion", title: "Accordion" },
  { id: "Avatar", title: "Avatar" },
  { id: "Badge", title: "Badge" },
  { id: "Button", title: "Buttons" },
  { id: "Card", title: "Cards" },
  { id: "Checkbox", title: "Checkbox" },
  { id: "Chip", title: "Chips" },
  { id: "DateTime", title: "Date & Time" },
  { id: "Divider", title: "Divider" },
  { id: "EmptyState", title: "Empty State" },
  { id: "FAB", title: "Floating Action Button (FAB)" },
  { id: "Input", title: "Inputs" },
  { id: "ListItem", title: "List Item" },
  { id: "Loading", title: "Loading Indicator" },
  { id: "ProgressBar", title: "Progress Bar" },
  { id: "Radio", title: "Radio Button" },
  { id: "Range", title: "Range Slider" },
  { id: "SearchBar", title: "Search Bar" },
  { id: "Segment", title: "Segmented Control" },
  { id: "Select", title: "Select / Picker" },
  { id: "Skeleton", title: "Skeleton Loader" },
  { id: "Toggle", title: "Switch Toggle" },
  { id: "Interactions", title: "Interactions (Modal/Alert/Toast)" },
];

export default function ComponentsScreen() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() =>
          navigation.navigate("Detail", {
            component: item.id,
            title: item.title,
          })
        }
        style={({ pressed }) => ({
          backgroundColor: colors.surface,
          padding: spacing.m,
          marginBottom: spacing.s,
          borderRadius: spacing.s,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          borderColor: colors.disabled,
        })}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: typography.sizes.body,
            fontWeight: typography.weights.medium,
          }}
        >
          {item.title}
        </Text>
        <Ionicons name="chevron-forward" size={20} color={colors.text} />
      </Pressable>
    ),
    [colors, spacing, typography, navigation]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Components" showBack={true} />
      <View style={{ flex: 1, padding: spacing.m }}>
        <FlashList
          data={COMPONENT_LIST}
          renderItem={renderItem}
          estimatedItemSize={60}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
