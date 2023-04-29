import { type InputRadioOption } from '@/types/InputRadioOption';

import { Circle, Container, Field, Label } from './styles';

interface InputRadioProps {
  options: InputRadioOption[];
  onChange: (prop: string | number) => void;
  value: string | number;
}

export const InputRadio = ({
  options,
  value,
  onChange,
}: InputRadioProps): JSX.Element => {
  const onSelectOption = (option: InputRadioOption['value']): void => {
    onChange(option);
  };

  return (
    <Container>
      {options.map(option => (
        <Field
          key={String(option.value)}
          onPress={() => {
            onSelectOption(option.value);
          }}
          activeOpacity={1}
        >
          <Circle $isSelected={option.value === value} />
          <Label>{option.label}</Label>
        </Field>
      ))}
    </Container>
  );
};
