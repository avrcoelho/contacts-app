import { render } from '@testing-library/react-native';

import { Index } from '..';

describe('Index Component', () => {
  it('should be able to render component', () => {
    expect(() => render(<Index />)).not.toThrow();
  });
});
