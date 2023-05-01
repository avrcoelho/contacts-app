import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Text = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: ${Colors.BLUE};
`;
