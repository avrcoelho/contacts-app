import { renderHook } from '@testing-library/react-native';

import { useDebounce } from '../useDebounce';

const mockFunc = jest.fn();

const runInterval = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
};

describe('debounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should able to return value', () => {
    const { result } = renderHook(() => useDebounce(500));

    result.current(mockFunc);
    jest.advanceTimersByTime(500);
    runInterval();

    expect(mockFunc).toHaveBeenCalled();
  });
});
