import { render } from '@testing-library/react-native';

import { SmallLoader } from '..';

describe('SmallLoader component', () => {
  it('should be able to render component', () => {
    expect(() => render(<SmallLoader />)).not.toThrow();
  });
});
