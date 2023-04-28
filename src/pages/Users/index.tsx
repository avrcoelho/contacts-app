import { Text } from 'react-native';

import { UserItem } from '@/components/UserItem';

import { Container, UsersList } from './styles';
import { useController } from './useController';

export const Users = (): JSX.Element => {
  const {
    isLoading,
    searchBy,
    hasSearch,
    total,
    users,
    onUpdateSearchBy,
    onRefreshList,
    onEndReached,
    onClearSearch,
    onSearch,
  } = useController();

  return (
    <Container>
      <UsersList
        keyExtractor={user => String(user.id)}
        data={users}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        onRefresh={onRefreshList}
        refreshing={isLoading}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        renderItem={UserItem}
      />
    </Container>
  );
};
