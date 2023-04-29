import { fireEvent, render, screen } from '@testing-library/react-native';

import { searchByOptions } from '@/constants/searchByOptions';

import { InputRadio } from '..';

const props = {
  options: searchByOptions,
  value: 'email',
  onChange: jest.fn(),
};

describe('InputRadio component', () => {
  it('should be able to render component', () => {
    expect(() => render(<InputRadio {...props} />)).not.toThrow();
  });

  it('should be able to call onChange when press on option', () => {
    render(<InputRadio {...props} />);

    fireEvent.press(screen.getByText(/Nome/i));

    expect(props.onChange).toBeCalledWith('firstName');
  });
});
