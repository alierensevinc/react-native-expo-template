import React, { useState, useRef, useMemo } from "react";
import { View, Text, ScrollView, Alert, Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import Header from "../components/Header";

// Components
import Accordion from "../components/Accordion";
import Button from "../components/Button";
import Card from "../components/Card";
import Checkbox from "../components/Checkbox";
import Chip from "../components/Chip";
import DateTime from "../components/DateTime";
import Input from "../components/Input";
import Loading from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import Radio from "../components/Radio";
import Range from "../components/Range";
import SearchBar from "../components/SearchBar";
import Segment from "../components/Segment";
import Select from "../components/Select";
import Toggle from "../components/Toggle";

import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen({ route }) {
  const { component, title } = route.params || {};
  const { colors, spacing, typography } = useTheme();

  // State mgmt for various demos
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [dateValue, setDateValue] = useState(new Date());
  const [rangeValue, setRangeValue] = useState(50);
  const [selectValue, setSelectValue] = useState("");
  const [chips, setChips] = useState(["React", "Native", "Expo"]);
  const [modalVisible, setModalVisible] = useState(false);

  // Bottom Sheet
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const renderContent = () => {
    switch (component) {
      case "Accordion":
        return (
          <View>
            <Accordion title="Accordion 1">
              <Text style={{ color: colors.text }}>Content 1</Text>
            </Accordion>
            <Accordion title="Accordion 2">
              <Text style={{ color: colors.text }}>
                Content 2 with more text inside to show expansion.
              </Text>
            </Accordion>
          </View>
        );
      case "Button":
        return (
          <View style={{ gap: spacing.m }}>
            <Button title="Primary" variant="primary" onPress={() => {}} />
            <Button title="Secondary" variant="secondary" onPress={() => {}} />
            <Button title="Outline" variant="outline" onPress={() => {}} />
            <Button
              title="Loading"
              loading
              variant="primary"
              onPress={() => {}}
            />
            <Button
              title="Disabled"
              disabled
              variant="primary"
              onPress={() => {}}
            />
          </View>
        );
      case "Card":
        return (
          <View style={{ gap: spacing.m }}>
            <Card>
              <Text style={{ color: colors.text, fontWeight: "bold" }}>
                Basic Card
              </Text>
              <Text style={{ color: colors.text }}>
                This is a simple card component.
              </Text>
            </Card>
            <Card onPress={() => Alert.alert("Card Pressed")}>
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                Pressable Card
              </Text>
              <Text style={{ color: colors.text }}>
                Tap me to see the press animation.
              </Text>
            </Card>
          </View>
        );
      case "Checkbox":
        return (
          <View style={{ gap: spacing.m }}>
            <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked={true} onChange={() => {}} />
            <Checkbox
              label="Interactive"
              checked={checkboxValue}
              onChange={setCheckboxValue}
            />
          </View>
        );
      case "Chip":
        return (
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.s }}
          >
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                onDelete={() => setChips(chips.filter((c) => c !== chip))}
              />
            ))}
            <Chip label="Read Only" selected />
            <Chip
              label="+ Add"
              onPress={() => setChips([...chips, `New ${chips.length}`])}
            />
          </View>
        );
      case "DateTime":
        return (
          <View style={{ gap: spacing.m }}>
            <Text style={{ color: colors.text }}>
              Selected: {dateValue.toLocaleString()}
            </Text>
            <DateTime
              value={dateValue}
              onChange={(_, d) => setDateValue(d || dateValue)}
            />
          </View>
        );
      case "Input":
        return (
          <View style={{ gap: spacing.m }}>
            <Input
              label="Standard"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Input
              label="Password"
              secureTextEntry
              // Internal toggle now handles the icon
            />
            <Input label="Error" error="Invalid input" />
          </View>
        );
      case "Loading":
        return (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Loading size="small" />
            <Loading size="medium" />
            <Loading size="large" color={colors.secondary} />
          </View>
        );
      case "ProgressBar":
        return (
          <View style={{ gap: spacing.m }}>
            <ProgressBar progress={0.3} />
            <ProgressBar progress={0.7} />
            <ProgressBar progress={1.0} />
          </View>
        );
      case "Radio":
        return (
          <View style={{ gap: spacing.m }}>
            <Radio
              label="Option 1"
              selected={!radioValue}
              onChange={() => setRadioValue(false)}
            />
            <Radio
              label="Option 2"
              selected={radioValue}
              onChange={() => setRadioValue(true)}
            />
          </View>
        );
      case "Range":
        return (
          <View style={{ gap: spacing.m }}>
            <Text style={{ color: colors.text }}>Value: {rangeValue}</Text>
            <Range
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={rangeValue}
              onValueChange={setRangeValue}
            />
          </View>
        );
      case "SearchBar":
        return (
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            onClear={() => setSearchValue("")}
            placeholder="Search..."
          />
        );
      case "Segment":
        return (
          <Segment
            options={["Daily", "Weekly", "Monthly"]}
            selectedIndex={segmentIndex}
            onChange={setSegmentIndex}
          />
        );
      case "Select":
        return (
          <Select
            items={[
              { label: "Java", value: "java" },
              { label: "Detail", value: "js" },
            ]}
            selectedValue={selectValue}
            onValueChange={setSelectValue}
            label="Language"
          />
        );
      case "Toggle":
        return <Toggle value={toggleValue} onValueChange={setToggleValue} />;
      case "Interactions":
        return (
          <View style={{ gap: spacing.m }}>
            <Button
              title="Alert"
              variant="secondary"
              onPress={() => Alert.alert("Alert!")}
            />
            <Button
              title="Toast"
              variant="success"
              onPress={() => Toast.show({ type: "success", text1: "Toast" })}
            />
            <Button
              title="Modal"
              variant="primary"
              onPress={() => setModalVisible(true)}
            />
            <Button
              title="Bottom Sheet"
              variant="outline"
              onPress={handlePresentModalPress}
            />
          </View>
        );
      default:
        return (
          <Text style={{ color: colors.text }}>
            Select a component to view.
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={title || "Detail"} showBack={true} />
      <ScrollView
        contentContainerStyle={{ padding: spacing.m, paddingBottom: 100 }}
      >
        {renderContent()}
      </ScrollView>

      {/* Interactive Modals */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.placeholder }}
      >
        <BottomSheetView style={{ flex: 1, padding: spacing.m }}>
          <Text style={{ color: colors.text }}>Bottom Sheet Content</Text>
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Modal Content
            </Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
    shadowOffset: { width: 0, height: 2 },
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
