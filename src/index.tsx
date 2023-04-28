import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationContainer } from 'react-native-hook-notification';

import { Users } from './pages/Users';

const STYLES = {
  flex: 1,
};

export const Index = (): JSX.Element => (
  <GestureHandlerRootView style={STYLES}>
    <SafeAreaView style={STYLES}>
      <StatusBar style="auto" />
      <Users />
      <NotificationContainer position="bottom-center" />
    </SafeAreaView>
  </GestureHandlerRootView>
);
