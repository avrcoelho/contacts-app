import { useEffect, useRef, useState } from 'react';
import { useNotification } from 'react-native-hook-notification';

import { LIMIT } from '@/constants/getUser';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@/hooks/useQuery';
import { type User } from '@/models/User';
import { getUsers } from '@/services/getUsers';
import { type SearchBy } from '@/types/SearchBy';

interface UseControllerReturn {
  isLoading: boolean;
  searchBy: SearchBy;
  hasSearch: boolean;
  users: User[];
  total?: number;
  onUpdateSearchBy: (value: SearchBy) => void;
  onSearch: (value: string) => void;
  onRefreshList: () => void;
  onEndReached: () => void;
  onClearSearch: () => void;
}

const DEBOUNCE_DELAY = 500;

export const useController = (): UseControllerReturn => {
  const [searchBy, setSearchBy] = useState<SearchBy>('firstName');
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

  const onUpdateSearchBy = (value: SearchBy): void => {
    searchByRef.current = value;
    setSearchBy(value);
    refetch();
  };

  const onRefreshList = (): void => {
    skipRef.current = 0;
    refetch();
  };

  const onDebaounce = useDebounce(DEBOUNCE_DELAY);
  const onSearch = (value: string): void => {
    skipRef.current = 0;
    searchRef.current = value;
    setHasSearch(value !== '');
    onDebaounce(refetch);
  };

  const onClearSearch = (): void => {
    skipRef.current = 0;
    searchRef.current = '';
    setHasSearch(false);
    refetch();
  };

  const onEndReached = (): void => {
    const canLoadMoreData = !isLoading && skipRef.current < Number(data?.total);
    if (canLoadMoreData) {
      skipRef.current = skipRef.current + LIMIT;
      refetch();
    }
  };

  return {
    isLoading,
    searchBy,
    hasSearch,
    total: data?.total,
    users,
    onUpdateSearchBy,
    onRefreshList,
    onEndReached,
    onClearSearch,
    onSearch,
  };
};
