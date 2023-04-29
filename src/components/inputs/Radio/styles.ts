import styled, { css } from 'styled-components/native';

import { Colors } from '@/constants/Colors';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 8px;
  flex-direction: row;
`;

export const Field = styled.TouchableOpacity`
  align-self: flex-start;
  height: 20px;
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`;

interface ButtomProps {
  $isSelected: boolean;
}

const selectedStyle = css`
  border-color: ${Colors.DARK};
  background-color: ${Colors.DARK};
`;

export const Circle = styled.View<ButtomProps>`
  height: 18px;
  width: 18px;
  border-radius: 9px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${Colors.GRAY};
  background-color: transparent;
  ${({ $isSelected }) => $isSelected && selectedStyle};
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${Colors.DARK};
`;
