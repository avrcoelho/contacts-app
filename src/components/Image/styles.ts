import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';

interface ContainerProps {
  $size: number;
}

const TWO = 2;

export const Container = styled.View<ContainerProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $size }) => $size / TWO}px;
  border-color: ${Colors.LIGHT_GRAY};
  border-width: 4px;
  position: relative;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: Colors.DARK,
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface ImageProps extends ContainerProps {
  $isLoaded: boolean;
}

export const Image = styled.Image<ImageProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $size }) => $size / TWO}px;
  opacity: ${({ $isLoaded }) => Number($isLoaded)};
`;
