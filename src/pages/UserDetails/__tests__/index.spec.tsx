import { render, screen } from '@testing-library/react-native';

import { usersMOck } from '@/mocks/users';
import { useUserStore } from '@/stores/useUser';

import { UserDetails } from '..';

jest.mock('@/stores/useUser');

const mockUseUserStore = useUserStore as unknown as jest.Mock;

describe('UserDetails page', () => {
  it('should be able to render page with user data', () => {
    mockUseUserStore.mockImplementation(callback =>
      callback({ user: usersMOck.users[0] }),
    );
    render(<UserDetails />);

    expect(screen.getByText('Terry Medhurst')).toBeTruthy();
  });

  it('should not be able to render page with user data', () => {
    mockUseUserStore.mockImplementation(callback => callback({ user: null }));
    render(<UserDetails />);

    expect(screen.queryByText('Endereço')).toBeFalsy();
  });
});
