import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationContainer } from 'react-native-hook-notification';

import { Routes } from '@/Routes';

const STYLES = {
  flex: 1,
};

export const Index = (): JSX.Element => (
  <GestureHandlerRootView style={STYLES}>
    <SafeAreaView style={STYLES}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <NotificationContainer position="bottom-center" />
    </SafeAreaView>
  </GestureHandlerRootView>
);
