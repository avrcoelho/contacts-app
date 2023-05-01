import { Feather } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { useNotification } from 'react-native-hook-notification';

import { Colors } from '@/constants/Colors';

import { Container, Text } from './styles';

interface ButtonContactProps {
  type: 'mail' | 'phone';
  contact: string;
}

export const ButtonContact = ({
  contact,
  type,
}: ButtonContactProps): JSX.Element => {
  const notification = useNotification();

  const onPress = (url: string): void => {
    Linking.openURL(url).catch(() => {
      notification.error({
        text: 'Não é possivel abrir este link!',
      });
    });
  };

  const definedUrl = type === 'mail' ? `mailto:${contact}` : `tel:${contact}`;

  return (
    <Container
      onPress={() => {
        onPress(definedUrl);
      }}
    >
      <Feather name={type} size={19} color={Colors.BLUE} />
      <Text>{contact}</Text>
    </Container>
  );
};
