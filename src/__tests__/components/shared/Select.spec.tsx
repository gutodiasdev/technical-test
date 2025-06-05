import { Select } from '@/components/shared/Select';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

const options = [
  { value: 'apple', label: 'Maçã' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cereja' },
];

describe('Select', () => {
  it('deve renderizar label, placeholder e opções corretamente', () => {
    renderWithTheme(
      <Select
        id="frutas"
        label="Escolha uma fruta"
        placeholder="Selecione"
        options={options}
      />
    );

    expect(screen.getByLabelText('Escolha uma fruta')).toBeInTheDocument();
    expect(screen.getByText('Selecione')).toBeInTheDocument();
    expect(screen.getByText('Maçã')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cereja')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando error estiver definido', () => {
    renderWithTheme(
      <Select
        id="frutas"
        label="Fruta"
        error="Campo obrigatório"
        options={options}
      />
    );

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve exibir helperText quando não houver erro', () => {
    renderWithTheme(
      <Select
        id="frutas"
        label="Fruta"
        helperText="Você pode alterar depois"
        options={options}
      />
    );

    expect(screen.getByText('Você pode alterar depois')).toBeInTheDocument();
  });

  it('não deve exibir helperText se houver erro', () => {
    renderWithTheme(
      <Select
        id="frutas"
        label="Fruta"
        helperText="Texto auxiliar"
        error="Erro presente"
        options={options}
      />
    );

    expect(screen.queryByText('Texto auxiliar')).not.toBeInTheDocument();
    expect(screen.getByText('Erro presente')).toBeInTheDocument();
  });

  it('deve disparar evento de mudança quando uma opção for selecionada', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <Select
        id="frutas"
        label="Fruta"
        onChange={handleChange}
        options={options}
      />
    );

    fireEvent.change(screen.getByLabelText('Fruta'), {
      target: { value: 'banana' },
    });

    expect(handleChange).toHaveBeenCalled();
    expect((screen.getByLabelText('Fruta') as HTMLSelectElement).value).toBe('banana');
  });
});