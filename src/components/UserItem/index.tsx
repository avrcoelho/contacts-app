import { type User } from '@/models/User';

import { Container, FullName } from './styles';

interface UserItemProps {
  item: User;
}

export const UserItem = ({ item }: UserItemProps): JSX.Element => {
  const fullName = `${item.firstName} ${item.lastName}`;

  return (
    <Container>
      <FullName>{fullName}</FullName>
    </Container>
  );
};
