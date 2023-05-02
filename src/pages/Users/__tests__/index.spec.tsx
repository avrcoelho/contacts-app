import { render, screen } from '@testing-library/react-native';

import { usersMOck } from '@/mocks/users';

import { Users } from '..';
import { useController } from '../useController';

jest.mock('../useController');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockUseContoller = useController as jest.Mock;
const mockUseControllerReturn = {
  isLoading: true,
  isRefreshing: false,
  hasSearch: false,
  users: usersMOck.users,
  onRefreshList: jest.fn(),
  onEndReached: jest.fn(),
  onClearSearch: jest.fn(),
  onSearch: jest.fn(),
};
mockUseContoller.mockImplementation(() => mockUseControllerReturn);

describe('Users page', () => {
  it('should be able to render page', () => {
    expect(() => render(<Users />)).not.toThrow();
  });

  it('should be able to render loader component', () => {
    render(<Users />);

    expect(screen.getByLabelText('Carregando contatos...')).toBeTruthy();
  });

  it('should not be able to render loader component', () => {
    mockUseControllerReturn.isLoading = false;
    render(<Users />);

    expect(screen.queryByLabelText('Carregando contatos...')).toBeFalsy();
  });

  it('should be able to render contacts', () => {
    render(<Users />);

    expect(screen.getByText('Terry Medhurst')).toBeTruthy();
  });
});
