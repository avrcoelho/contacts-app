import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useNotification } from 'react-native-hook-notification';

import { usersMOck } from '@/mocks/users';
import { getUsers } from '@/services/getUsers';

import { useController } from '../useController';

jest.mock('@/services/getUsers');
jest.mock('react-native-hook-notification');
jest.mock('@/hooks/useDebounce', () => ({
  useDebounce:
    () =>
    (func = jest.fn) => {
      func();
    },
}));

const mockGetUsers = getUsers as jest.Mock;
const mockUseNotification = useNotification as jest.Mock;

describe('Contact hook controller', () => {
  afterEach(jest.clearAllMocks);

  it('should be able to return users', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    await waitFor(() => {
      expect(result.current.users).toEqual(
        expect.arrayContaining(usersMOck.users),
      );
    });
  });

  it('should be able to return users after load more data', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    await waitFor(() => result.current.users);
    act(() => {
      result.current.onEndReached();
    });

    await waitFor(() => {
      expect(result.current.users).toHaveLength(2);
    });
  });

  it('should not be able to load more users', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    await waitFor(() => result.current.users);
    act(() => {
      result.current.onEndReached();
    });
    await waitFor(() => result.current.users.length === 2);
    act(() => {
      result.current.onEndReached();
    });

    await waitFor(() => {
      expect(result.current.users).toHaveLength(2);
    });
  });

  it('should be able to dispatch notification error when request failure', async () => {
    const mockError = jest.fn();
    mockUseNotification.mockImplementation(() => ({
      error: mockError,
    }));
    mockGetUsers.mockRejectedValue(new Error('Some arror occurred'));
    renderHook(useController);

    await waitFor(() => {
      expect(mockError).toBeCalledWith({
        text: 'Ocorreu um erro ao carregar os contato!',
      });
    });
  });

  it('should be able to change searchBy value', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    act(() => {
      result.current.onChangeSearchBy('email');
    });

    expect(result.current.searchBy).toBe('email');
    await act(async () => {
      await Promise.resolve();
    });
  });

  it('should be able to reset users data after refetch list', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    await waitFor(() => result.current.users);
    act(() => {
      result.current.onEndReached();
    });
    await waitFor(() => result.current.users.length === 2);
    act(() => {
      result.current.onRefreshList();
    });

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
    });
  });

  it('should be able to search', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    act(() => {
      result.current.onSearch('John');
    });

    expect(result.current.hasSearch).toBeTruthy();
    await act(async () => {
      await Promise.resolve();
    });
  });

  it('should be able to clear search', async () => {
    mockGetUsers.mockResolvedValue(usersMOck);
    const { result } = renderHook(useController);

    act(() => {
      result.current.onSearch('John');
    });
    act(() => {
      result.current.onClearSearch();
    });

    expect(result.current.hasSearch).toBeFalsy();
    await act(async () => {
      await Promise.resolve();
    });
  });
});
