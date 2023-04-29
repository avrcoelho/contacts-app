import styled, { css } from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Field = styled.TouchableOpacity`
  align-self: flex-start;
  height: 20px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

interface ButtomProps {
  $isSelected: boolean;
}

const selectedStyle = css`
  border-color: ${Colors.DARK};
  background-color: ${Colors.DARK};
`;

export const Circle = styled.View<ButtomProps>`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${Colors.LIGHT_GRAY};
  background-color: transparent;
  ${({ $isSelected }) => $isSelected && selectedStyle};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.DARK};
`;
