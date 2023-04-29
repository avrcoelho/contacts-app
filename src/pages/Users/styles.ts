import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '@/constants/Colors';
import { type User } from '@/models/User';

export const Container = styled.View`
  padding: 0 8px;
  background-color: ${Colors.WHITE};
`;

export const UsersList = styled(FlatList<User>)``;

export const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Colors.LIGHT_GRAY};
`;
