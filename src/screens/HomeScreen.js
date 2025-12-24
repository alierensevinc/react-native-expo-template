import { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import { useTheme } from "../context/ThemeContext";
import Card from "../components/Card";
import Header from "../components/Header";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Handlers
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleAlertPress = () => {
    Alert.alert("Alert Title", "This is an example alert message.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleToastPress = () => {
    Toast.show({
      type: "success",
      text1: "Hello!",
      text2: "This is a toast message 👋",
    });
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

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
            paddingBottom: 100, // Extra padding for bottom sheet
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

          {/* ... existing card ... */}
          <Card onPress={() => navigation.navigate("Detail", { itemId: 42 })}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Go to Detail Screen
            </Text>
            <Text style={{ color: colors.text, marginTop: spacing.s }}>
              Tap me to test navigation and see the custom back button!
            </Text>
          </Card>

          {/* Interaction Examples */}
          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.title,
              marginTop: spacing.m,
            }}
          >
            Interactions
          </Text>

          <Button
            title="Open Action Sheet (Bottom Sheet)"
            onPress={handlePresentModalPress}
            variant="outline"
          />

          <Button
            title="Show Alert"
            onPress={handleAlertPress}
            variant="secondary"
          />

          <Button
            title="Open Modal"
            onPress={handleModalPress}
            variant="primary"
          />

          <Button
            title="Show Toast"
            onPress={handleToastPress}
            variant="outline"
          />

          {/* ... existing buttons/loading ... */}
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

      {/* Interactable Components */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.placeholder }}
      >
        <BottomSheetView
          style={{ flex: 1, padding: spacing.m, alignItems: "center" }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: typography.sizes.title,
              marginBottom: spacing.m,
            }}
          >
            Action Sheet Content
          </Text>
          <Button
            title="Option 1"
            onPress={() => bottomSheetModalRef.current?.dismiss()}
            variant="primary"
          />
          <Button
            title="Option 2"
            onPress={() => bottomSheetModalRef.current?.dismiss()}
            variant="outline"
          />
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Hello World!
            </Text>
            <Text style={{ color: colors.text, marginBottom: spacing.m }}>
              This is a native Modal.
            </Text>
            <Button
              title="Close Modal"
              onPress={() => setModalVisible(!modalVisible)}
              variant="primary"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
