import { useCallback } from 'react';

let timer: NodeJS.Timeout;

export const useDebounce = (delay: number): ((func: () => void) => void) =>
  useCallback(
    (func): void => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func();
      }, delay);
    },
    [delay],
  );
