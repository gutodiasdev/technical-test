import { FormContainer } from '@/components/shared/FormContainer';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('FormContainer Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar um container div', () => {
      renderWithTheme(
        <FormContainer data-testid="form-container">
          <div>Conteúdo do container</div>
        </FormContainer>
      );
      const container = screen.getByTestId('form-container');

      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe('DIV');
    });

    it('deve renderizar conteúdo filho corretamente', () => {
      renderWithTheme(
        <FormContainer>
          <form data-testid="inner-form">
            <input type="text" placeholder="Campo teste" />
            <button type="submit">Enviar</button>
          </form>
        </FormContainer>
      );

      expect(screen.getByTestId('inner-form')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Campo teste')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
    });
  });

  describe('Estilos de layout', () => {
    it('deve aplicar dimensões e centralização corretamente', () => {
      renderWithTheme(
        <FormContainer data-testid="styled-container">
          <div>Conteúdo centralizado</div>
        </FormContainer>
      );
      const container = screen.getByTestId('styled-container');

      expect(container).toHaveStyle(`
        width: 400px;
        height: calc(100vh - 40px);
        margin: 0 auto;
      `);
    });

    it('deve aplicar grid layout com centralização', () => {
      renderWithTheme(
        <FormContainer data-testid="grid-container">
          <div>Item centralizado</div>
        </FormContainer>
      );
      const container = screen.getByTestId('grid-container');

      expect(container).toHaveStyle(`
        display: grid;
        place-items: center;
      `);
    });
  });

  describe('Comportamento responsivo', () => {
    it('deve manter largura fixa independente do conteúdo', () => {
      renderWithTheme(
        <FormContainer data-testid="fixed-width">
          <div style={{ width: '600px' }}>
            Conteúdo mais largo que o container
          </div>
        </FormContainer>
      );
      const container = screen.getByTestId('fixed-width');

      expect(container).toHaveStyle('width: 400px');
    });

    it('deve centralizar múltiplos elementos filhos', () => {
      renderWithTheme(
        <FormContainer data-testid="multiple-children">
          <div data-testid="child-1">Primeiro filho</div>
          <div data-testid="child-2">Segundo filho</div>
          <div data-testid="child-3">Terceiro filho</div>
        </FormContainer>
      );
      const container = screen.getByTestId('multiple-children');

      expect(container).toHaveStyle('place-items: center');
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Props e atributos', () => {
    it('deve aceitar props nativas de div', () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <FormContainer
          onClick={handleClick}
          className="custom-class"
          data-testid="container-with-props"
          role="main"
        >
          <div>Conteúdo clicável</div>
        </FormContainer>
      );
      const container = screen.getByTestId('container-with-props');
      expect(container).toHaveAttribute('role', 'main');
      expect(container).toHaveClass('custom-class');
      container.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve aceitar interface FormContainerProps vazia', () => {
      renderWithTheme(
        <FormContainer data-testid="no-specific-props">
          <div>Sem props específicas</div>
        </FormContainer>
      );

      const container = screen.getByTestId('no-specific-props');
      expect(container).toBeInTheDocument();
      expect(container).toHaveStyle(`
        width: 400px;
        height: calc(100vh - 40px);
        display: grid;
        place-items: center;
      `);
    });
  });

  describe('Casos de uso comuns', () => {
    it('deve funcionar como wrapper para formulários de login', () => {
      renderWithTheme(
        <FormContainer data-testid="login-wrapper">
          <form data-testid="login-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>
          </form>
        </FormContainer>
      );
      const wrapper = screen.getByTestId('login-wrapper');
      const form = screen.getByTestId('login-form');

      expect(wrapper).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    });
  });
});