import { ActivityIndicator } from 'react-native';

import { Colors } from '@/constants/Colors';

export const SmallLoader = (): JSX.Element => (
  <ActivityIndicator size="small" color={Colors.DARK} />
);
