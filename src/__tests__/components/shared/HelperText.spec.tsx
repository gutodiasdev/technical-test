import { HelperText } from '@/components/shared/HelperText';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

describe('HelperText Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar um elemento span', () => {
      renderWithTheme(
        <HelperText data-testid="helper-text">
          Texto de ajuda
        </HelperText>
      );

      const helperText = screen.getByTestId('helper-text');
      expect(helperText).toBeInTheDocument();
      expect(helperText.tagName).toBe('SPAN');
    });

    it('deve renderizar o texto fornecido', () => {
      const textoAjuda = "Este campo é obrigatório";
      renderWithTheme(
        <HelperText>{textoAjuda}</HelperText>
      );

      expect(screen.getByText(textoAjuda)).toBeInTheDocument();
    });

    it('deve renderizar conteúdo vazio quando não há texto', () => {
      renderWithTheme(
        <HelperText data-testid="empty-helper" />
      );

      const helperText = screen.getByTestId('empty-helper');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toBeEmptyDOMElement();
    });
  });

  describe('Estilos aplicados', () => {
    it('deve aplicar todos os estilos básicos corretamente', () => {
      renderWithTheme(
        <HelperText data-testid="styled-helper">
          Texto com estilos
        </HelperText>
      );

      const helperText = screen.getByTestId('styled-helper');
      expect(helperText).toHaveStyle(`
        font-size: 12px;
        color: #6c757d;
        margin-top: 4px;
        display: block;
        line-height: 1.4;
      `);
    });

    it('deve ter comportamento de elemento block', () => {
      renderWithTheme(
        <div>
          <HelperText data-testid="block-helper">Primeira linha</HelperText>
          <HelperText data-testid="block-helper-2">Segunda linha</HelperText>
        </div>
      );

      const firstHelper = screen.getByTestId('block-helper');
      const secondHelper = screen.getByTestId('block-helper-2');

      expect(firstHelper).toHaveStyle('display: block');
      expect(secondHelper).toHaveStyle('display: block');
    });
  });

  describe('Casos de uso comuns', () => {
    it('deve funcionar como helper text para campos de formulário', () => {
      renderWithTheme(
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Digite seu email" />
          <HelperText data-testid="email-helper">
            Utilizaremos seu email apenas para comunicação importante
          </HelperText>
        </div>
      );

      const helperText = screen.getByTestId('email-helper');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveStyle('margin-top: 4px');
      expect(screen.getByText('Utilizaremos seu email apenas para comunicação importante')).toBeInTheDocument();
    });

    it('deve funcionar para mensagens de erro', () => {
      renderWithTheme(
        <div>
          <input type="password" placeholder="Senha" />
          <HelperText data-testid="error-helper">
            A senha deve ter pelo menos 8 caracteres
          </HelperText>
        </div>
      );

      const errorHelper = screen.getByTestId('error-helper');
      expect(errorHelper).toHaveStyle('color: #6c757d');
      expect(screen.getByText('A senha deve ter pelo menos 8 caracteres')).toBeInTheDocument();
    });

    it('deve funcionar para instruções de preenchimento', () => {
      renderWithTheme(
        <div>
          <label htmlFor="phone">Telefone</label>
          <input type="tel" id="phone" placeholder="(11) 99999-9999" />
          <HelperText data-testid="instruction-helper">
            Formato: (XX) XXXXX-XXXX
          </HelperText>
        </div>
      );

      const instructionHelper = screen.getByTestId('instruction-helper');
      expect(instructionHelper).toHaveStyle('font-size: 12px');
      expect(screen.getByText('Formato: (XX) XXXXX-XXXX')).toBeInTheDocument();
    });
  });

  describe('Props e atributos', () => {
    it('deve aceitar props nativas de span', () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <HelperText
          onClick={handleClick}
          className="custom-helper"
          data-testid="helper-with-props"
          title="Tooltip de ajuda"
        >
          Texto clicável
        </HelperText>
      );

      const helperText = screen.getByTestId('helper-with-props');
      expect(helperText).toHaveAttribute('title', 'Tooltip de ajuda');
      expect(helperText).toHaveClass('custom-helper');

      // Testa evento de click
      helperText.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve aceitar conteúdo JSX como children', () => {
      renderWithTheme(
        <HelperText data-testid="jsx-helper">
          Texto com <strong>destaque</strong> e <em>ênfase</em>
        </HelperText>
      );

      const helperText = screen.getByTestId('jsx-helper');
      expect(helperText).toBeInTheDocument();
      expect(screen.getByText('destaque')).toBeInTheDocument();
      expect(screen.getByText('ênfase')).toBeInTheDocument();
    });
  });

  describe('Legibilidade e acessibilidade', () => {
    it('deve ter line-height adequado para legibilidade', () => {
      renderWithTheme(
        <HelperText data-testid="readable-helper">
          Este é um texto mais longo para testar a legibilidade
          e verificar se o line-height está funcionando corretamente
          para melhorar a experiência de leitura do usuário.
        </HelperText>
      );

      const helperText = screen.getByTestId('readable-helper');
      expect(helperText).toHaveStyle('line-height: 1.4');
    });

    it('deve manter consistência visual com tamanho de fonte pequeno', () => {
      renderWithTheme(
        <div>
          <HelperText data-testid="small-text-1">Primeiro helper</HelperText>
          <HelperText data-testid="small-text-2">Segundo helper</HelperText>
        </div>
      );

      const firstHelper = screen.getByTestId('small-text-1');
      const secondHelper = screen.getByTestId('small-text-2');

      expect(firstHelper).toHaveStyle('font-size: 12px');
      expect(secondHelper).toHaveStyle('font-size: 12px');
    });
  });
});