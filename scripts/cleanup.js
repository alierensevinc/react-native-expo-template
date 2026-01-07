const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const filesToDelete = [
  'src/screens/ComponentsScreen.jsx',
  'src/screens/DetailScreen.jsx',
];

filesToDelete.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

const homeScreenPath = path.join(projectRoot, 'src/screens/HomeScreen.jsx');
const homeScreenContent = `import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Home" showBack={false} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}>Welcome</Text>
      </View>
    </SafeAreaView>
  );
}
`;

fs.writeFileSync(homeScreenPath, homeScreenContent);
console.log('Modified: src/screens/HomeScreen.jsx');

const appJsPath = path.join(projectRoot, 'App.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Remove unused imports
appJsContent = appJsContent.replace(
  /import ComponentsScreen from '.*';\n/g,
  ''
);
appJsContent = appJsContent.replace(/import DetailScreen from '.*';\n/g, '');

// Remove unused routes
appJsContent = appJsContent.replace(
  /\s*<Stack\.Screen name="Detail" component=\{DetailScreen\} \/>/g,
  ''
);
appJsContent = appJsContent.replace(
  /\s*<Stack\.Screen name="Components" component=\{ComponentsScreen\} \/>/g,
  ''
);

// Update imports to use aliases
appJsContent = appJsContent.replace(/from '\.\/src\/i18n'/g, "from '@i18n'");
appJsContent = appJsContent.replace(
  /from '\.\/src\/context\//g,
  "from '@context/"
);
appJsContent = appJsContent.replace(
  /from '\.\/src\/screens\//g,
  "from '@screens/"
);

fs.writeFileSync(appJsPath, appJsContent);
console.log('Modified: App.js');
