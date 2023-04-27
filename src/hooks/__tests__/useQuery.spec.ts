import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useQuery } from '../useQuery';

describe('useQuery hook', () => {
  it('should be able to return data', async () => {
    const { result } = renderHook(() =>
      useQuery(async () => await Promise.resolve(true)),
    );

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
  });

  it('should be able to return error on request', async () => {
    const { result } = renderHook(() =>
      useQuery(
        async () => await Promise.reject(new Error('Someone error occurred')),
      ),
    );

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });

  it('should be able to return success on request when call refecth', async () => {
    const { result } = renderHook(() =>
      useQuery(async () => await Promise.resolve(true), { manualFetch: true }),
    );

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
  });

  it('should be able to execute query when is mount', async () => {
    const mockedQuery = jest
      .fn()
      .mockImplementation(async () => await Promise.resolve(true));
    const { rerender } = renderHook(() => useQuery(mockedQuery));
    rerender(mockedQuery);

    await waitFor(() => {
      expect(mockedQuery).toBeCalledTimes(1);
    });
  });
});
