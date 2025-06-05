import { Form } from '@/components/shared/Form';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('Form Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar conteúdo filho corretamente', () => {
      renderWithTheme(
        <Form>
          <div data-testid="form-content">Conteúdo do formulário</div>
          <input type="email" placeholder="Email" />
          <button type="submit">Submeter</button>
        </Form>
      );

      expect(screen.getByTestId('form-content')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submeter' })).toBeInTheDocument();
    });
  });

  describe('Estrutura e layout', () => {
    it('deve aplicar estilos de layout flexbox corretamente', () => {
      renderWithTheme(
        <Form data-testid="styled-form">
          <input type="text" />
          <button type="submit">Enviar</button>
        </Form>
      );

      const form = screen.getByTestId('styled-form');
      expect(form).toHaveStyle(`
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
      `);
    });

    it('deve renderizar seção de logo com estilos corretos', () => {
      renderWithTheme(
        <Form>
          <div id="logo" data-testid="logo-section">
            <img src="/logo.png" alt="Logo" />
          </div>
          <input type="text" />
        </Form>
      );

      const logoSection = screen.getByTestId('logo-section');
      expect(logoSection).toHaveStyle(`
        width: 100%;
        display: flex;
        justify-content: center;
      `);
    });

    it('deve renderizar seção de registro com estilos corretos', () => {
      renderWithTheme(
        <Form>
          <input type="text" />
          <div id="register" data-testid="register-section">
            <span>Não tem conta? </span>
            <a href="/register">Cadastre-se aqui</a>
          </div>
        </Form>
      );

      const registerSection = screen.getByTestId('register-section');
      expect(registerSection).toHaveStyle(`
        font-size: 12px;
        align-self: flex-end;
      `);
    });
  });

  describe('Links na seção de registro', () => {
    it('deve aplicar sublinhado aos links dentro da seção register', () => {
      renderWithTheme(
        <Form>
          <input type="text" />
          <div id="register">
            <span>Já tem conta? </span>
            <a href="/login" data-testid="register-link">Faça login</a>
          </div>
        </Form>
      );

      const link = screen.getByTestId('register-link');
      expect(link).toHaveStyle('text-decoration: underline');
    });

    it('deve permitir múltiplos links na seção register', () => {
      renderWithTheme(
        <Form>
          <input type="text" />
          <div id="register">
            <a href="/login" data-testid="login-link">Login</a>
            <span> | </span>
            <a href="/forgot-password" data-testid="forgot-link">Esqueci senha</a>
          </div>
        </Form>
      );

      const loginLink = screen.getByTestId('login-link');
      const forgotLink = screen.getByTestId('forgot-link');

      expect(loginLink).toHaveStyle('text-decoration: underline');
      expect(forgotLink).toHaveStyle('text-decoration: underline');
    });
  });

  describe('Props e atributos', () => {
    it('deve aceitar e aplicar props nativas do form', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());

      renderWithTheme(
        <Form
          onSubmit={handleSubmit}
          method="POST"
          data-testid="form-with-props"
        >
          <input type="text" required />
          <button type="submit">Enviar</button>
        </Form>
      );

      const form = screen.getByTestId('form-with-props');
      expect(form).toHaveAttribute('method', 'POST');

      form.dispatchEvent(new Event('submit', { bubbles: true }));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});