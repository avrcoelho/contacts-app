import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotification } from 'react-native-hook-notification';

import { LIMIT } from '@/constants/getUser';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@/hooks/useQuery';
import { type User } from '@/models/User';
import { getUsers } from '@/services/getUsers';
import { type InputRadioOption } from '@/types/InputRadioOption';
import { type SearchBy } from '@/types/SearchBy';

interface UseControllerReturn {
  isLoading: boolean;
  searchBy: SearchBy;
  hasSearch: boolean;
  users: User[];
  isRefreshing: boolean;
  onChangeSearchBy: (value: InputRadioOption['value']) => void;
  onSearch: (value: string) => void;
  onRefreshList: () => Promise<void>;
  onEndReached: () => void;
  onClearSearch: () => void;
}

const DEBOUNCE_DELAY = 500;

export const useController = (): UseControllerReturn => {
  const [searchBy, setSearchBy] = useState<SearchBy>('firstName');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const searchRef = useRef('');
  const searchByRef = useRef<SearchBy>('firstName');
  const skipRef = useRef(0);

  const { data, isLoading, refetch, isSuccess, isError } = useQuery(
    async () =>
      await getUsers({
        searchBy: searchByRef.current,
        search: searchRef.current,
        skip: skipRef.current,
      }),
  );

  useEffect(() => {
    const canSetUsers = isSuccess && data?.users !== undefined;
    if (canSetUsers) {
      setUsers(prevState =>
        skipRef.current === 0 ? data.users : [...prevState, ...data.users],
      );
    }
  }, [data?.users, isSuccess]);

  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: 'Ocorreu um erro ao carregar os contato!',
      });
    }
  }, [isError, notification]);

  const onChangeSearchBy = useCallback(
    (value: InputRadioOption['value']): void => {
      searchByRef.current = value as SearchBy;
      setSearchBy(value as SearchBy);
      if (searchRef.current !== '') {
        refetch();
      }
    },
    [refetch],
  );

  const onRefreshList = async (): Promise<void> => {
    skipRef.current = 0;
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const onDebaounce = useDebounce(DEBOUNCE_DELAY);
  const onSearch = useCallback(
    (value: string): void => {
      skipRef.current = 0;
      searchRef.current = value;
      setHasSearch(value !== '');
      onDebaounce(refetch);
    },
    [onDebaounce, refetch],
  );

  const onClearSearch = useCallback((): void => {
    skipRef.current = 0;
    searchRef.current = '';
    setHasSearch(false);
    refetch();
  }, [refetch]);

  const onEndReached = (): void => {
    const canLoadMoreData =
      !isLoading && skipRef.current < Number(data?.total) - LIMIT;
    if (canLoadMoreData) {
      skipRef.current = skipRef.current + LIMIT;
      refetch();
    }
  };

  return {
    isLoading,
    searchBy,
    hasSearch,
    users,
    isRefreshing,
    onChangeSearchBy,
    onRefreshList,
    onEndReached,
    onClearSearch,
    onSearch,
  };
};
