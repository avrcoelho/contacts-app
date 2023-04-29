import { type ParamListBase, useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { Image } from '@/components/Image';
import { Routes } from '@/constants/Routes';
import { type User } from '@/models/User';
import { useUserStore } from '@/stores/useUser';

import { Container, FullName } from './styles';

interface UserItemProps {
  item: User;
}

export const UserItem = ({ item }: UserItemProps): JSX.Element => {
  const onSetUser = useUserStore(state => state.onSetUser);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onPress = (): void => {
    onSetUser(item);
    navigation.navigate(Routes.USER_DETAILS);
  };

  const fullName = `${item.firstName} ${item.lastName}`;

  return (
    <Container onPress={onPress}>
      <Image uri={item.image} size={50} />
      <FullName>{fullName}</FullName>
    </Container>
  );
};
