import { render } from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('should be able to render component', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
