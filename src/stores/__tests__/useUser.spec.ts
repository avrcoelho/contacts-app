import { act, renderHook } from '@testing-library/react-native';

import { usersMock } from '@/mocks/users';

import { useUserStore } from '../useUser';

const [user] = usersMock.users;

describe('useUserStore', () => {
  it('should be able to set user data', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.onSetUser(user);
    });

    expect(result.current.user).toEqual(expect.objectContaining(user));
  });
});
