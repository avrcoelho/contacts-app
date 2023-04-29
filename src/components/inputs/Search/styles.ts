import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled.View`
  width: 100%;
  padding: 0 10px;
  margin: 10px 0 14px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 34px;
  flex-direction: row;
  align-items: center;
  border-radius: 17px;
  background-color: ${Colors.LIGHT_GRAY};
  padding: 0 10px;
`;

export const Input = styled.TextInput`
  height: 100%;
  flex: 1;
  padding: 0 6px;
  font-size: 16px;
  color: ${Colors.DARK};
`;

export const ButtonClear = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: ${Colors.WHITE};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
