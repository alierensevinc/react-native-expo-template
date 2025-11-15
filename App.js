// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootStack/>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}