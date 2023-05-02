import { useMemo } from 'react';

import { InputSearch } from '@/components/inputs/Search';
import { UserItem } from '@/components/UserItem';

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
    hasSearch,
    users,
    onRefreshList,
    onEndReached,
    onClearSearch,
    onSearch,
  } = useController();

  const listHeader = useMemo(
    () => (
      <InputSearch
        hasSearch={hasSearch}
        onClearSearch={onClearSearch}
        onSearch={onSearch}
      />
    ),
    [hasSearch, onClearSearch, onSearch],
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
