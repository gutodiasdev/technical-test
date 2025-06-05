import { LoginForm } from '@/components/shared/LoginForm';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useLogin } from '../../../hooks/mutations/useLogin';

const mockTheme = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('../../../hooks/mutations/useLogin', () => ({
  useLogin: jest.fn(),
}));

describe('LoginForm', () => {
  const mutateAsyncMock = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
    });
  });

  it('deve renderizar o formulário com campos de email e senha', () => {
    renderWithTheme(<LoginForm />);
    expect(screen.getByPlaceholderText('Seu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve exibir link para cadastro', () => {
    renderWithTheme(<LoginForm />);
    const registerLink = screen.getByRole('link', { name: /cadatrar-se/i });
    expect(registerLink).toHaveAttribute('href', '/cadastrar-se');
  });
});
