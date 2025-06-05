import { Input } from '@/components/shared/Input';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { createRef } from 'react';

describe('Input Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar um input básico', () => {
      renderWithTheme(<Input data-testid="basic-input" />);

      const input = screen.getByTestId('basic-input');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('deve renderizar com label quando fornecido', () => {
      renderWithTheme(
        <Input
          id="email-input"
          label="Email"
          data-testid="input-with-label"
        />
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('deve renderizar sem label quando não fornecido', () => {
      renderWithTheme(<Input data-testid="input-no-label" />);

      const input = screen.getByTestId('input-no-label');
      expect(input).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Estados de erro', () => {
    it('deve exibir mensagem de erro quando fornecida', () => {
      const errorMessage = "Este campo é obrigatório";
      renderWithTheme(
        <Input
          error={errorMessage}
          data-testid="input-with-error"
        />
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      const errorText = screen.getByText(errorMessage);
      expect(errorText).toHaveStyle('color: #dc3545');
    });

    it('deve aplicar estilos de erro no input quando há erro', () => {
      renderWithTheme(
        <Input
          error="Erro de validação"
          data-testid="error-styled-input"
        />
      );

      const input = screen.getByTestId('error-styled-input');
      expect(input).toHaveStyle('border-color: #dc3545');
    });

    it('deve priorizar erro sobre helper text', () => {
      const errorMessage = "Campo inválido";
      const helperMessage = "Texto de ajuda";

      renderWithTheme(
        <Input
          error={errorMessage}
          helperText={helperMessage}
          data-testid="error-priority"
        />
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(helperMessage)).not.toBeInTheDocument();
    });
  });

  describe('Helper text', () => {
    it('deve exibir helper text quando fornecido', () => {
      const helperMessage = "Digite seu email válido";
      renderWithTheme(
        <Input
          helperText={helperMessage}
          data-testid="input-with-helper"
        />
      );

      const helperText = screen.getByText(helperMessage);
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveStyle('color: #6c757d');
    });

    it('não deve exibir helper text quando há erro', () => {
      renderWithTheme(
        <Input
          error="Erro presente"
          helperText="Helper text"
          data-testid="helper-hidden-on-error"
        />
      );

      expect(screen.getByText('Erro presente')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Estados do input', () => {
    it('deve aplicar estilos de disabled quando desabilitado', () => {
      renderWithTheme(
        <Input
          disabled
          data-testid="disabled-input"
        />
      );

      const input = screen.getByTestId('disabled-input');
      expect(input).toBeDisabled();
      expect(input).toHaveStyle(`
        background-color: #f8f9fa;
        cursor: not-allowed;
      `);
    });

    it('deve aplicar estilos de focus corretamente', () => {
      renderWithTheme(
        <Input data-testid="focusable-input" />
      );

      const input = screen.getByTestId('focusable-input');
      input.focus();

      expect(input).toHaveFocus();
      expect(input).toHaveStyle('border-color: #007bff');
    });

    it('deve aplicar estilos de focus com erro', () => {
      renderWithTheme(
        <Input
          error="Campo inválido"
          data-testid="error-focus-input"
        />
      );

      const input = screen.getByTestId('error-focus-input');
      input.focus();

      expect(input).toHaveFocus();
      expect(input).toHaveStyle('border-color: #dc3545');
    });
  });

  describe('Props nativas', () => {
    it('deve aceitar e aplicar props nativas do input', () => {
      renderWithTheme(
        <Input
          type="email"
          placeholder="Digite seu email"
          required
          maxLength={100}
          data-testid="native-props-input"
        />
      );

      const input = screen.getByTestId('native-props-input');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Digite seu email');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('maxLength', '100');
    });

    it('deve lidar com eventos corretamente', () => {
      const handleChange = jest.fn();
      const handleBlur = jest.fn();

      renderWithTheme(
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="event-input"
        />
      );

      const input = screen.getByTestId('event-input');

      fireEvent.change(input, { target: { value: 'teste' } });
      expect(handleChange).toHaveBeenCalledTimes(1);

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Forward ref', () => {
    it('deve encaminhar ref corretamente', () => {
      const ref = createRef<HTMLInputElement>();

      renderWithTheme(
        <Input
          ref={ref}
          data-testid="ref-input"
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByTestId('ref-input'));
    });

    it('deve permitir foco via ref', () => {
      const ref = createRef<HTMLInputElement>();

      renderWithTheme(
        <Input
          ref={ref}
          data-testid="focus-ref-input"
        />
      );

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Layout e estrutura', () => {
    it('deve aplicar estilos de container corretamente', () => {
      renderWithTheme(
        <div data-testid="input-wrapper">
          <Input label="Teste" />
        </div>
      );

      const wrapper = screen.getByTestId('input-wrapper');
      const container = wrapper.firstChild;

      expect(container).toHaveStyle(`
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
      `);
    });

    it('deve aplicar estilos básicos do input', () => {
      renderWithTheme(
        <Input data-testid="styled-input" />
      );

      const input = screen.getByTestId('styled-input');
      expect(input).toHaveStyle(`
        padding: 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.2s ease;
      `);
    });
  });

  describe('Casos de uso completos', () => {
    it('deve funcionar como campo de login completo', () => {
      renderWithTheme(
        <Input
          id="login-email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          helperText="Usaremos apenas para login"
          required
          data-testid="login-input"
        />
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
      expect(screen.getByText('Usaremos apenas para login')).toBeInTheDocument();

      const input = screen.getByTestId('login-input');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('required');
    });

    it('deve funcionar como campo com validação de erro', () => {
      renderWithTheme(
        <Input
          id="password-field"
          type="password"
          label="Senha"
          error="Senha deve ter pelo menos 8 caracteres"
          helperText="Este texto não deve aparecer"
          data-testid="validation-input"
        />
      );

      expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      expect(screen.getByText('Senha deve ter pelo menos 8 caracteres')).toBeInTheDocument();
      expect(screen.queryByText('Este texto não deve aparecer')).not.toBeInTheDocument();

      const input = screen.getByTestId('validation-input');
      expect(input).toHaveStyle('border-color: #dc3545');
    });
  });
});