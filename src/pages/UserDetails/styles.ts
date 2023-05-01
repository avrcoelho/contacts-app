import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled.View`
  padding: 0 8px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 12px;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.DARK};
  text-align: center;
  margin: 12px 0 32px;
`;
