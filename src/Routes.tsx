import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '@/constants/Colors';
import { Routes as RouteNames } from '@/constants/Routes';
import { Users } from '@/pages/Users';

const Stack = createStackNavigator();

export const Routes = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name={RouteNames.USERS}
      component={Users}
      options={{
        title: 'Contatos',
        headerTitleAlign: 'left',
        headerTintColor: Colors.DARK,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
      }}
    />
    <Stack.Screen
      name={RouteNames.USER_DETAILS}
      component={Users}
      options={{
        headerBackTitleVisible: false,
        title: 'Detalhes do contato',
        headerTintColor: Colors.DARK,
        headerTitleStyle: {
          fontSize: 14,
          textTransform: 'uppercase',
        },
      }}
    />
  </Stack.Navigator>
);
