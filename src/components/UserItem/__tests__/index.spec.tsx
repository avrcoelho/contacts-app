import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Routes } from '@/constants/Routes';
import { usersMOck } from '@/mocks/users';

import { UserItem } from '..';

jest.mock('@react-navigation/native');
const mockUseNavigation = useNavigation as jest.Mock;
const mockNavigate = jest.fn();
mockUseNavigation.mockImplementation(() => ({
  navigate: mockNavigate,
}));

const props = {
  item: usersMOck.users[0],
};

describe('UserItem component', () => {
  it('should be able to render component', () => {
    expect(() => render(<UserItem {...props} />)).not.toThrow();
  });

  it('should be able to call navigate after press button', () => {
    render(<UserItem {...props} />);

    const fullName = `${props.item.firstName} ${props.item.lastName}`;
    fireEvent.press(screen.getByText(fullName));

    expect(mockNavigate).toBeCalledWith(Routes.USER_DETAILS);
  });
});
