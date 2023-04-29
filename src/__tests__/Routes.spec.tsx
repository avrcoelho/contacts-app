import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { Routes } from '../Routes';

describe('Routes Component', () => {
  it('should be able to render component', () => {
    expect(() =>
      render(<Routes />, {
        wrapper: NavigationContainer,
      }),
    ).not.toThrow();
  });
});
