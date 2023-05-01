import { useMemo } from 'react';

import { InputRadio } from '@/components/inputs/Radio';
import { InputSearch } from '@/components/inputs/Search';
import { UserItem } from '@/components/UserItem';
import { searchByOptions } from '@/constants/searchByOptions';

import {
  Container,
  ItemSeparator,
  Loader,
  LoaderContainer,
  UsersList,
} from './styles';
import { useController } from './useController';

const ITEM_SIZE = 72;
const END_REACHED_THRESHOLD = 0.1;

export const Users = (): JSX.Element => {
  const {
    isLoading,
    isRefreshing,
    searchBy,
    hasSearch,
    users,
    onChangeSearchBy,
    onRefreshList,
    onEndReached,
    onClearSearch,
    onSearch,
  } = useController();

  const listHeader = useMemo(
    () => (
      <>
        <InputSearch
          hasSearch={hasSearch}
          onClearSearch={onClearSearch}
          onSearch={onSearch}
        />
        <InputRadio
          options={searchByOptions}
          value={searchBy}
          onChange={onChangeSearchBy}
        />
      </>
    ),
    [hasSearch, onClearSearch, onSearch, onChangeSearchBy, searchBy],
  );

  const listFooter = useMemo(() => {
    return isLoading && !isRefreshing ? (
      <LoaderContainer>
        <Loader accessibilityLabel="Carregando contatos..." />
      </LoaderContainer>
    ) : null;
  }, [isLoading, isRefreshing]);

  return (
    <Container>
      <UsersList
        keyExtractor={user => String(user.id)}
        data={users}
        onEndReached={onEndReached}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        onRefresh={onRefreshList}
        refreshing={isRefreshing}
        getItemLayout={(_, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        renderItem={({ item }) => <UserItem item={item} />}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={listFooter}
      />
    </Container>
  );
};
