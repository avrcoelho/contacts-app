import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Linking } from 'react-native';
import { useNotification } from 'react-native-hook-notification';

import { ButtonContact } from '..';

jest.mock('react-native-hook-notification');

const props = {
  type: 'mail' as 'mail' | 'phone',
  contact: 'john.doe@mail.com',
};
const mockUseNotification = useNotification as jest.Mock;
const mockError = jest.fn();
mockUseNotification.mockImplementation(() => ({
  error: mockError,
}));

describe('ButtonContact component', () => {
  it('should be able to render component', () => {
    expect(() => render(<ButtonContact {...props} />)).not.toThrow();
  });

  it('should be able to call openUrl with mail URL', () => {
    const spiedLink = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    render(<ButtonContact {...props} />);

    fireEvent.press(screen.getByText(props.contact));

    expect(spiedLink).toBeCalled();
  });

  it('should be able to call openUrl with phone URL', () => {
    const newProps = {
      type: 'phone' as 'mail' | 'phone',
      contact: '+5512345678543',
    };
    const spiedLink = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    render(<ButtonContact {...newProps} />);

    fireEvent.press(screen.getByText(newProps.contact));

    expect(spiedLink).toBeCalled();
  });

  it('should be able to call notification error', async () => {
    const newProps = {
      type: 'phone' as 'mail' | 'phone',
      contact: '+5512345678543',
    };
    jest
      .spyOn(Linking, 'openURL')
      .mockRejectedValue(new Error('Some error occurred'));
    render(<ButtonContact {...newProps} />);

    fireEvent.press(screen.getByText(newProps.contact));

    await waitFor(() => {
      expect(mockError).toBeCalledWith({
        text: 'Não é possivel abrir este link!',
      });
    });
  });
});
