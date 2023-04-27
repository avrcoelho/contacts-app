import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const STYLES = {
  flex: 1,
};

export const Index = (): JSX.Element => (
  <GestureHandlerRootView style={STYLES}>
    <SafeAreaView style={STYLES}>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </SafeAreaView>
  </GestureHandlerRootView>
);
