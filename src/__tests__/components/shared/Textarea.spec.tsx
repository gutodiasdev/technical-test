import { Textarea } from '@/components/shared/Textarea';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const mockTheme = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Textarea', () => {
  it('deve renderizar o label e a textarea corretamente', () => {
    renderWithTheme(
      <Textarea id="comentario" label="Comentário" />
    );

    expect(screen.getByLabelText('Comentário')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando `error` for definido', () => {
    renderWithTheme(
      <Textarea
        id="descricao"
        label="Descrição"
        error="Campo obrigatório"
      />
    );

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve exibir `helperText` quando não houver erro', () => {
    renderWithTheme(
      <Textarea
        id="descricao"
        label="Descrição"
        helperText="Descreva com detalhes"
      />
    );

    expect(screen.getByText('Descreva com detalhes')).toBeInTheDocument();
  });

  it('não deve exibir `helperText` se `error` estiver presente', () => {
    renderWithTheme(
      <Textarea
        id="descricao"
        label="Descrição"
        helperText="Texto auxiliar"
        error="Erro presente"
      />
    );

    expect(screen.queryByText('Texto auxiliar')).not.toBeInTheDocument();
    expect(screen.getByText('Erro presente')).toBeInTheDocument();
  });

  it('deve disparar evento de mudança quando texto for digitado', () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <Textarea
        id="mensagem"
        label="Mensagem"
        onChange={handleChange}
      />
    );

    const textarea = screen.getByLabelText('Mensagem');
    fireEvent.change(textarea, { target: { value: 'Novo texto' } });

    expect(handleChange).toHaveBeenCalled();
    expect((textarea as HTMLTextAreaElement).value).toBe('Novo texto');
  });
});
