import { Button } from '@/components/shared/Button';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

describe('Button Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o botão com texto', () => {
      renderWithTheme(<Button>Clique aqui</Button>);
      expect(screen.getByRole('button', { name: 'Clique aqui' })).toBeInTheDocument();
    });
  });

  describe('Props de tipo', () => {
    it('deve definir o type como submit quando especificado', () => {
      renderWithTheme(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('deve definir o type como reset quando especificado', () => {
      renderWithTheme(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Estados de loading', () => {
    it('deve mostrar "Carregando..." quando loading é true', () => {
      renderWithTheme(<Button loading>Texto original</Button>);
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
      expect(screen.queryByText('Texto original')).not.toBeInTheDocument();
    });

    it('deve desabilitar o botão quando loading é true', () => {
      renderWithTheme(<Button loading>Teste</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Estados de disabled', () => {
    it('deve desabilitar o botão quando disabled é true', () => {
      renderWithTheme(<Button disabled>Teste</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('deve manter o texto original quando apenas disabled', () => {
      renderWithTheme(<Button disabled>Texto original</Button>);
      expect(screen.getByText('Texto original')).toBeInTheDocument();
    });

    it('deve desabilitar quando tanto disabled quanto loading são true', () => {
      renderWithTheme(<Button disabled loading>Teste</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  describe('Variantes de estilo', () => {
    it('deve aplicar variant primary por padrão', () => {
      renderWithTheme(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #007bff');
    });

    it('deve aplicar variant secondary', () => {
      renderWithTheme(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #6c757d');
    });

    it('deve aplicar variant danger', () => {
      renderWithTheme(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #dc3545');
    });
  });

  describe('Tamanhos', () => {
    it('deve aplicar size medium por padrão', () => {
      renderWithTheme(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 12px 20px; font-size: 14px');
    });

    it('deve aplicar size small', () => {
      renderWithTheme(<Button size="small">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 8px 16px; font-size: 14px');
    });

    it('deve aplicar size large', () => {
      renderWithTheme(<Button size="large">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 16px 24px; font-size: 16px');
    });
  });

  describe('Eventos', () => {
    it('deve chamar onClick quando clicado', () => {
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Clique</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onClick quando disabled', () => {
      const handleClick = jest.fn();
      renderWithTheme(
        <Button onClick={handleClick} disabled>
          Clique
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('não deve chamar onClick quando loading', () => {
      const handleClick = jest.fn();
      renderWithTheme(
        <Button onClick={handleClick} loading>
          Clique
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Focus e acessibilidade', () => {
    it('deve ser focável por padrão', () => {
      renderWithTheme(<Button>Focusable</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('não deve ser focável quando disabled', () => {
      renderWithTheme(<Button disabled>Not focusable</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Props adicionais', () => {
    it('deve passar props adicionais para o elemento button', () => {
      renderWithTheme(
        <Button data-testid="custom-button" aria-label="Custom label">
          Teste
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Combinações de estados', () => {
    it('deve priorizar loading sobre disabled para o texto', () => {
      renderWithTheme(
        <Button disabled loading>
          Texto original
        </Button>
      );

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
      expect(screen.queryByText('Texto original')).not.toBeInTheDocument();
    });

    it('deve combinar variant e size corretamente', () => {
      renderWithTheme(
        <Button variant="danger" size="large">
          Large Danger
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #dc3545');
      expect(button).toHaveStyle('padding: 16px 24px; font-size: 16px');
    });
  });
});