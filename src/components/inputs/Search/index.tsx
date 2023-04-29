import { MaterialIcons } from '@expo/vector-icons';
import { useRef } from 'react';
import { type TextInput } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ButtonClear, Container, Input, InputContainer } from './styles';

interface InputSearchProps {
  hasSearch: boolean;
  onSearch: (value: string) => void;
  onClearSearch: () => void;
}

export const InputSearch = ({
  hasSearch,
  onSearch,
  onClearSearch,
}: InputSearchProps): JSX.Element => {
  const inputRef = useRef<TextInput>(null);

  const onClearInput = (): void => {
    inputRef.current?.clear();
    onClearSearch();
  };

  return (
    <Container>
      <InputContainer>
        <MaterialIcons name="search" color={Colors.GRAY} size={26} />

        <Input
          ref={inputRef}
          onChangeText={onSearch}
          placeholder="Pesquisar"
          placeholderTextColor={Colors.GRAY}
          underlineColorAndroid="transparent"
        />

        {hasSearch && (
          <ButtonClear
            activeOpacity={0.6}
            onPress={onClearInput}
            accessibilityLabel="Limpar pesquisa"
          >
            <MaterialIcons name="close" color={Colors.GRAY} size={18} />
          </ButtonClear>
        )}
      </InputContainer>
    </Container>
  );
};
