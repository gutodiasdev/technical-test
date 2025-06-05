import { Label } from '@/components/shared/Label';
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

describe('Label Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar um elemento label', () => {
      renderWithTheme(
        <Label data-testid="basic-label">
          Nome do campo
        </Label>
      );

      const label = screen.getByTestId('basic-label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('deve renderizar o texto fornecido', () => {
      const textoLabel = "Email";
      renderWithTheme(
        <Label>{textoLabel}</Label>
      );

      expect(screen.getByText(textoLabel)).toBeInTheDocument();
    });

    it('deve renderizar conteúdo vazio quando não há texto', () => {
      renderWithTheme(
        <Label data-testid="empty-label" />
      );

      const label = screen.getByTestId('empty-label');
      expect(label).toBeInTheDocument();
      expect(label).toBeEmptyDOMElement();
    });
  });

  describe('Estilos aplicados', () => {
    it('deve aplicar todos os estilos básicos corretamente', () => {
      renderWithTheme(
        <Label data-testid="styled-label">
          Label estilizado
        </Label>
      );

      const label = screen.getByTestId('styled-label');
      expect(label).toHaveStyle(`
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
        display: block;
      `);
    });

    it('deve ter comportamento de elemento block', () => {
      renderWithTheme(
        <div>
          <Label data-testid="block-label-1">Primeiro label</Label>
          <Label data-testid="block-label-2">Segundo label</Label>
        </div>
      );

      const firstLabel = screen.getByTestId('block-label-1');
      const secondLabel = screen.getByTestId('block-label-2');

      expect(firstLabel).toHaveStyle('display: block');
      expect(secondLabel).toHaveStyle('display: block');
    });
  });

  describe('Acessibilidade e associação com inputs', () => {
    it('deve associar-se corretamente com input usando htmlFor', () => {
      renderWithTheme(
        <div>
          <Label htmlFor="email-input" data-testid="associated-label">
            Email
          </Label>
          <input type="email" id="email-input" />
        </div>
      );

      const label = screen.getByTestId('associated-label');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
      expect(screen.getByLabelText('Email')).toBe(input);
    });

    it('deve funcionar sem associação quando htmlFor não é fornecido', () => {
      renderWithTheme(
        <Label data-testid="standalone-label">
          Label independente
        </Label>
      );

      const label = screen.getByTestId('standalone-label');
      expect(label).not.toHaveAttribute('for');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Props e atributos', () => {
    it('deve aceitar props nativas de label', () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <Label
          onClick={handleClick}
          className="custom-label"
          data-testid="label-with-props"
          title="Tooltip do label"
        >
          Label clicável
        </Label>
      );

      const label = screen.getByTestId('label-with-props');
      expect(label).toHaveAttribute('title', 'Tooltip do label');
      expect(label).toHaveClass('custom-label');

      // Testa evento de click
      fireEvent.click(label);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve aceitar conteúdo JSX como children', () => {
      renderWithTheme(
        <Label data-testid="jsx-label">
          Campo <strong>obrigatório</strong> <span style={{ color: 'red' }}>*</span>
        </Label>
      );

      const label = screen.getByTestId('jsx-label');
      expect(label).toBeInTheDocument();
      expect(screen.getByText('obrigatório')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Casos de uso em formulários', () => {
    it('deve funcionar em formulário de login', () => {
      renderWithTheme(
        <form>
          <Label htmlFor="login-email" data-testid="email-label">
            Email
          </Label>
          <input type="email" id="login-email" required />

          <Label htmlFor="login-password" data-testid="password-label">
            Senha
          </Label>
          <input type="password" id="login-password" required />
        </form>
      );

      const emailLabel = screen.getByTestId('email-label');
      const passwordLabel = screen.getByTestId('password-label');

      expect(emailLabel).toHaveStyle('margin-bottom: 8px');
      expect(passwordLabel).toHaveStyle('margin-bottom: 8px');
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    });

    it('deve funcionar com campos obrigatórios', () => {
      renderWithTheme(
        <div>
          <Label htmlFor="required-field" data-testid="required-label">
            Nome completo *
          </Label>
          <input type="text" id="required-field" required />
        </div>
      );

      const label = screen.getByTestId('required-label');
      expect(label).toHaveStyle('font-weight: 500');
      expect(screen.getByText('Nome completo *')).toBeInTheDocument();
    });

    it('deve funcionar com diferentes tipos de input', () => {
      renderWithTheme(
        <div>
          <Label htmlFor="text-input">Campo de texto</Label>
          <input type="text" id="text-input" />

          <Label htmlFor="checkbox-input">Aceito os termos</Label>
          <input type="checkbox" id="checkbox-input" />

          <Label htmlFor="select-input">Selecione uma opção</Label>
          <select id="select-input">
            <option value="">Escolha...</option>
          </select>
        </div>
      );

      expect(screen.getByLabelText('Campo de texto')).toBeInTheDocument();
      expect(screen.getByLabelText('Aceito os termos')).toBeInTheDocument();
      expect(screen.getByLabelText('Selecione uma opção')).toBeInTheDocument();
    });
  });

  describe('Consistência visual', () => {
    it('deve manter consistência de estilo entre múltiplas instâncias', () => {
      renderWithTheme(
        <div>
          <Label data-testid="label-1">Primeiro label</Label>
          <Label data-testid="label-2">Segundo label</Label>
          <Label data-testid="label-3">Terceiro label</Label>
        </div>
      );

      const labels = [
        screen.getByTestId('label-1'),
        screen.getByTestId('label-2'),
        screen.getByTestId('label-3')
      ];

      labels.forEach(label => {
        expect(label).toHaveStyle(`
          font-size: 14px;
          font-weight: 500;
          color: #333;
        `);
      });
    });

    it('deve ter espaçamento adequado para separar do próximo elemento', () => {
      renderWithTheme(
        <div>
          <Label data-testid="spaced-label">Label com espaçamento</Label>
          <input type="text" />
        </div>
      );

      const label = screen.getByTestId('spaced-label');
      expect(label).toHaveStyle('margin-bottom: 8px');
    });
  });
});