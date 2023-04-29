import { render } from '@testing-library/react-native';

import { Image } from '..';

const props = {
  size: 60,
  uri: 'https://github.com/avrcoelho.png',
};

describe('Image component', () => {
  it('should be able to render component', () => {
    expect(() => render(<Image {...props} />)).not.toThrow();
  });
});
