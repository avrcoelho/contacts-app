import { useState } from 'react';

import { Container, Image as ImageStyled, Loader } from './styles';

interface ImageProps {
  size: number;
  uri: string;
}

export const Image = ({ size, uri }: ImageProps): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = (): void => {
    setIsLoaded(true);
  };

  return (
    <Container $size={size}>
      {!isLoaded && <Loader testID="image-loader" />}
      <ImageStyled
        $size={size}
        $isLoaded={isLoaded}
        resizeMode="center"
        source={{ uri }}
        onLoad={onLoad}
      />
    </Container>
  );
};
