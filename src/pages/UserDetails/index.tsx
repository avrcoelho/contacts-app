import { ButtonContact } from '@/components/Buttons/Contact';
import { Image } from '@/components/Image';
import { useUserStore } from '@/stores/useUser';

import {
  Address,
  AddressTitle,
  Container,
  ImageContainer,
  Name,
} from './styles';

const IMAGE_SIZE = 160;

export const UserDetails = (): JSX.Element | null => {
  const user = useUserStore(state => state.user);

  return user === null ? null : (
    <Container>
      <ImageContainer>
        <Image uri={user.image} size={IMAGE_SIZE} />
      </ImageContainer>

      <Name>
        {user.firstName} {user.lastName}
      </Name>

      <ButtonContact contact={user.phone} type="phone" />
      <ButtonContact contact={user.email} type="mail" />

      <AddressTitle>Endereço</AddressTitle>
      <Address>{user.address.address}</Address>
      <Address>
        {user.address.city}, {user.address.state}
      </Address>
      <Address>{user.address.postalCode}</Address>
    </Container>
  );
};
