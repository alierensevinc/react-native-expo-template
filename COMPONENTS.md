# UI Component Library Documentation

Comprehensive guide to using the theme-aware UI components in this project.

## 🚀 Theme Integration

All components automatically adapt to the active theme.

```javascript
import { useTheme } from "../context/ThemeContext";
// const { colors, spacing, typography, isDark, toggleTheme } = useTheme();
```

---

## 🧩 Components

### 1. Accordion

Expandable content panel.

```javascript
import Accordion from "../components/Accordion";

<Accordion title="Section Title">
  <Text>Hidden content goes here.</Text>
</Accordion>;
```

**Props:**

- `title` (string): Header text.
- `children` (node): Content to show when expanded.

### 2. Button

Standard button with variants.

```javascript
import Button from "../components/Button";

<Button title="Save" onPress={handleSave} variant="primary" />;
```

**Props:**

- `title` (string): Button label.
- `variant` ('primary' | 'secondary' | 'outline'): Style variant. Default: `primary`.
- `loading` (bool): Shows spinner.
- `disabled` (bool): Disables interaction.
- `onPress` (fn): specific action.

### 3. Card

Container with shadow and optional press interaction.

```javascript
import Card from '../components/Card';

// Static
<Card>
  <Text>Card Content</Text>
</Card>

// Pressable
<Card onPress={() => console.log('Pressed')}>
  <Text>Clickable Card</Text>
</Card>
```

**Props:**

- `onPress` (fn, optional): Makes card interactive.
- `children` (node): Card content.

### 4. Checkbox

Boolean selection input.

```javascript
import Checkbox from "../components/Checkbox";

<Checkbox label="Accept Terms" checked={isChecked} onChange={setIsChecked} />;
```

**Props:**

- `label` (string, optional): Text next to box.
- `checked` (bool): Active state.
- `onChange` (fn): Receives new boolean value.

### 5. Chip

Compact element for tags or filters.

```javascript
import Chip from '../components/Chip';

// Interactive
<Chip label="Filter" selected={isSelected} onPress={toggle} />
// Deletable
<Chip label="Tag" onDelete={removeTag} />
```

**Props:**

- `label` (string): Text content.
- `selected` (bool): Active background style.
- `onDelete` (fn, optional): XML shows 'x' button.
- `onPress` (fn, optional): Tap action.

### 6. DateTime

Date and time picker wrapper.

```javascript
import DateTime from "../components/DateTime";

<DateTime
  value={date}
  mode="date" // or "time", "datetime"
  onChange={(event, newDate) => setDate(newDate)}
/>;
```

**Props:**

- `value` (Date): Current date object.
- `mode` (string): Picker mode.
- `onChange` (fn): Handler.

### 7. Header

Standard screen header.

```javascript
import Header from "../components/Header";

<Header title="My Screen" showBack={true} />;
```

**Props:**

- `title` (string): Screen title.
- `showBack` (bool): Shows back arrow (uses `navigation.goBack()`).
- `rightComponent` (node, optional): Custom element on the right (e.g., Icon).

### 8. Input

Text input with floating label and error support.

```javascript
import Input from '../components/Input';

<Input
  label="Email"
  value={text}
  onChangeText={setText}
  error={errorMessage}
/>

// Password (auto-toggle)
<Input label="Password" secureTextEntry />
```

**Props:**

- `label` (string): Floating label text.
- `error` (string, optional): Error message below input.
- `secureTextEntry` (bool): Enables password mode with toggle eye.
- `leftIcon`, `rightIcon` (node, optional): Icons inside input.
- Standard `TextInput` props (`placeholder`, `keyboardType`, etc.).

### 9. Loading

Activity indicator.

```javascript
import Loading from "../components/Loading";

<Loading size="large" />;
```

**Props:**

- `size` ('small' | 'large'): Spinner size.
- `color` (string, optional): Custom color override.

### 10. ProgressBar

Linear progress indicator.

```javascript
import ProgressBar from "../components/ProgressBar";

<ProgressBar progress={0.5} />;
```

**Props:**

- `progress` (number): Value between 0.0 and 1.0.

### 11. Radio

Single selection indicator.

```javascript
import Radio from "../components/Radio";

<Radio
  label="Option A"
  selected={selected === "A"}
  onChange={() => setSelected("A")}
/>;
```

**Props:**

- `label` (string, optional): Label text.
- `selected` (bool): Active state.
- `onChange` (fn): Selection handler.

### 12. Range

Slider control.

```javascript
import Range from "../components/Range";

<Range
  value={val}
  minimumValue={0}
  maximumValue={100}
  step={1}
  onValueChange={setVal}
/>;
```

**Aliases `@react-native-community/slider` props.**

### 13. SearchBar

Specialized input for search.

```javascript
import SearchBar from "../components/SearchBar";

<SearchBar
  value={query}
  onChangeText={setQuery}
  onClear={() => setQuery("")}
/>;
```

**Props:**

- `onClear` (fn): Action when 'x' is pressed.

### 14. Segment

Tab-like control for mode switching.

```javascript
import Segment from "../components/Segment";

<Segment
  options={["Day", "Week", "Month"]}
  selectedIndex={index}
  onChange={setIndex}
/>;
```

**Props:**

- `options` (array<string>): Labels for segments.
- `selectedIndex` (number): Active index.
- `onChange` (fn): Receives new index.

### 15. Select

Dropdown picker wrapper.

```javascript
import Select from "../components/Select";

<Select
  label="Language"
  items={[
    { label: "English", value: "en" },
    { label: "Turkish", value: "tr" },
  ]}
  selectedValue={lang}
  onValueChange={setLang}
/>;
```

**Props:**

- `items` (array<{label, value}>): Data source.
- `label` (string, optional): Label for the field.
- Wraps `@react-native-picker/picker`.

### 16. Toggle

Switch control.

```javascript
import Toggle from "../components/Toggle";

<Toggle value={isOn} onValueChange={setIsOn} />;
```

**Props:**

- `value` (bool): On/off state.
- `onValueChange` (fn): Toggle handler.

### 17. Avatar

Circular image or initials display.

```javascript
import Avatar from '../components/Avatar';

<Avatar initials="JD" size={40} />
<Avatar source={imageUri} size={60} />
```

**Props:**

- `source` (ImageSource): Image to display.
- `initials` (string): Fallback text (limit 2 chars).
- `size` (number): Diameter.
- `backgroundColor` (string): Circle color.

### 18. Badge

Notification indicator.

```javascript
import Badge from "../components/Badge";

<Badge content={3} color="red" />;
```

**Props:**

- `content` (string/number): Value to show.
- `size` (number): Diameter/Height.
- `color` (string): Background color.

### 19. Divider

Visual separator.

```javascript
import Divider from "../components/Divider";

<Divider orientation="horizontal" />;
```

**Props:**

- `orientation` ('horizontal' | 'vertical').
- `width` (number): Thickness.

### 20. ListItem

Standard list row.

```javascript
import ListItem from "../components/ListItem";

<ListItem
  title="Profile"
  left={<Icon name="person" />}
  onPress={goToProfile}
/>;
```

**Props:**

- `title` (string): Main text.
- `subtitle` (string): Secondary text.
- `left`, `right` (node): Icons/Avatars.
- `divider` (bool): Shows bottom border.

### 21. FAB

Floating Action Button.

```javascript
import FAB from "../components/FAB";

<FAB icon="add" onPress={addItem} position="bottom-right" />;
```

**Props:**

- `icon` (string): Ionicons name.
- `position` ('bottom-right' | 'bottom-left' | 'center').

### 22. Skeleton

Loading placeholder animation.

```javascript
import Skeleton from '../components/Skeleton';

<Skeleton width={100} height={20} />
<Skeleton variant="circle" width={50} />
```

**Props:**

- `variant` ('rect' | 'circle').
- `width`, `height`.

### 23. EmptyState

Placeholder for empty content.

```javascript
import EmptyState from "../components/EmptyState";

<EmptyState
  title="No Data"
  icon="file-tray"
  actionLabel="Retry"
  onAction={fetchData}
/>;
```

**Props:**

- `title`, `description` (string).
- `icon` (string): Ionicons name.
- `actionLabel` (string): Button text.

---

## 🔔 Interactions

### Bottom Sheet

Requires `BottomSheetModalProvider` in root.

```javascript
// Ref
const bottomSheetRef = useRef(null);
// Open
bottomSheetRef.current?.present();

// Render
<BottomSheetModal ref={bottomSheetRef} snapPoints={["25%", "50%"]}>
  <View>
    <Text>Content</Text>
  </View>
</BottomSheetModal>;
```

### Toast

Requires `<Toast />` in root.

```javascript
import Toast from "react-native-toast-message";
Toast.show({ type: "success", text1: "Saved!" });
```
