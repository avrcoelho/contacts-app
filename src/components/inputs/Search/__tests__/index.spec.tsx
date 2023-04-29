import { fireEvent, render, screen } from '@testing-library/react-native';

import { InputSearch } from '..';

const props = {
  hasSearch: false,
  onSearch: jest.fn(),
  onClearSearch: jest.fn(),
};

describe('InputSearch component', () => {
  it('should be able to render component', () => {
    expect(() => render(<InputSearch {...props} />)).not.toThrow();
  });

  it('should not be able to render clear button when there is not serach', () => {
    render(<InputSearch {...props} />);

    expect(screen.queryByLabelText('Limpar pesquisa')).toBeFalsy();
  });

  it('should be able to render clear button when there is serach', () => {
    render(<InputSearch {...props} hasSearch />);

    expect(screen.getByLabelText('Limpar pesquisa')).toBeTruthy();
  });

  it('should be able to call onClearSearch when click on clear button', () => {
    render(<InputSearch {...props} hasSearch />);

    fireEvent.press(screen.getByLabelText('Limpar pesquisa'));

    expect(props.onClearSearch).toBeCalled();
  });

  it('should be able to call onSearch when change input value', () => {
    render(<InputSearch {...props} hasSearch />);

    fireEvent.changeText(screen.getByPlaceholderText('Pesquisar'), 'John');

    expect(props.onSearch).toBeCalledWith('John');
  });
});
