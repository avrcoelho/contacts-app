import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
`;

export const FullName = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 16px;
  font-weight: bold;
`;
