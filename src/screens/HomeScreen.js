import {Text} from "react-native";
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function HomeScreen() {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}
                       style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
        </Animated.View>
    );
}
