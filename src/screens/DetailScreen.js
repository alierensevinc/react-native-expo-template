import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import Card from "../components/Card";
import Accordion from "../components/Accordion";
import Checkbox from "../components/Checkbox";
import Chip from "../components/Chip";
import Input from "../components/Input";
import ProgressBar from "../components/ProgressBar";
import Radio from "../components/Radio";
import Range from "../components/Range";
import SearchBar from "../components/SearchBar";
import Segment from "../components/Segment";
import Select from "../components/Select";
import Toggle from "../components/Toggle";
import DateTime from "../components/DateTime";
import Button from "../components/Button";

const DetailScreen = ({ route }) => {
  const { colors, spacing, typography } = useTheme();

  // State for components
  const [isChecked, setIsChecked] = useState(false);
  const [chips, setChips] = useState(["React", "Native", "Expo"]);
  const [inputValue, setInputValue] = useState("");
  const [radioSelected, setRadioSelected] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const [searchValue, setSearchValue] = useState("");
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [selectValue, setSelectValue] = useState("java");
  const [toggleValue, setToggleValue] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());

  const handleChipDelete = (chipToDelete) => {
    setChips(chips.filter((c) => c !== chipToDelete));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="All Components" showBack={true} />
      <ScrollView
        contentContainerStyle={{ padding: spacing.m, paddingBottom: 100 }}
      >
        <Text
          style={{
            ...typography.headline,
            color: colors.text,
            marginBottom: spacing.m,
          }}
        >
          Extended Library
        </Text>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Accordion
          </Text>
          <Accordion title="Tap to expand">
            <Text style={{ color: colors.text }}>
              This is the hidden content inside the accordion. It animates open
              and closed using reanimated transitions!
            </Text>
          </Accordion>
        </Card>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Inputs & Selects
          </Text>
          <Input
            label="Floating Label Input"
            placeholder="Type something..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            onClear={() => setSearchValue("")}
            style={{ marginVertical: spacing.s }}
          />
          <Select
            label="Choose Language"
            selectedValue={selectValue}
            onValueChange={setSelectValue}
            items={[
              { label: "JavaScript", value: "js" },
              { label: "Java", value: "java" },
              { label: "Swift", value: "swift" },
            ]}
          />
        </Card>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Toggles & Controls
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: spacing.s,
            }}
          >
            <Text style={{ color: colors.text }}>Checkbox</Text>
            <Checkbox checked={isChecked} onChange={setIsChecked} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: spacing.s,
            }}
          >
            <Text style={{ color: colors.text }}>Radio Button</Text>
            <Radio selected={radioSelected} onChange={setRadioSelected} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: spacing.s,
            }}
          >
            <Text style={{ color: colors.text }}>Switch Toggle</Text>
            <Toggle value={toggleValue} onValueChange={setToggleValue} />
          </View>

          <Text style={{ color: colors.text, marginTop: spacing.s }}>
            Segmented Control
          </Text>
          <Segment
            options={["Daily", "Weekly", "Monthly"]}
            selectedIndex={segmentIndex}
            onChange={setSegmentIndex}
            style={{ marginTop: spacing.xs }}
          />
        </Card>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Progress & Range
          </Text>
          <Text style={{ color: colors.text, fontSize: 12, marginBottom: 4 }}>
            Progress Bar
          </Text>
          <ProgressBar progress={0.7} style={{ marginBottom: spacing.m }} />

          <Range
            label={`Slider Value: ${Math.round(rangeValue)}`}
            value={rangeValue}
            onValueChange={setRangeValue}
            min={0}
            max={100}
          />
        </Card>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Chips
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                onDelete={() => handleChipDelete(chip)}
                onPress={() => Alert.alert(`Pressed ${chip}`)}
                selected={chip === "React"}
              />
            ))}
            <Chip
              label="+ Add"
              onPress={() => setChips([...chips, `Item ${chips.length + 1}`])}
            />
            <Chip label="Read Only" selected={true} style={{ marginLeft: 8 }} />
          </View>
        </Card>

        <Card style={{ marginBottom: spacing.m }}>
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              marginBottom: spacing.s,
            }}
          >
            Date & Time
          </Text>
          <DateTime
            label="Pick a Date"
            value={dateValue}
            onChange={(e, d) => setDateValue(d)}
            mode="date"
          />
        </Card>

        <Button
          title="Done"
          onPress={() => Alert.alert("Nice!", "All components rendered.")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
