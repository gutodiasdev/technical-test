import { StatusBadge } from '@/components/shared/Badge';
import { renderWithTheme } from '@/setupTests';
import { AssetStatus } from '@/types/asset';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('StatusBadge', () => {
  it('deve renderizar o badge com status "Ativo"', () => {
    renderWithTheme(<StatusBadge status="Ativo" />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve renderizar o badge com status "Em manutenção"', () => {
    renderWithTheme(<StatusBadge status="Em manutenção" />);
    expect(screen.getByText('Em manutenção')).toBeInTheDocument();
  });

  it('deve renderizar o badge com status "Inativo"', () => {
    renderWithTheme(<StatusBadge status="Inativo" />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve renderizar como elemento span', () => {
    renderWithTheme(<StatusBadge status="Ativo" />);
    const badge = screen.getByText('Ativo');
    expect(badge.tagName).toBe('SPAN');
  });

  it('deve aceitar todos os valores válidos de AssetStatus', () => {
    const statuses: AssetStatus[] = ['Ativo', 'Em manutenção', 'Inativo'];

    statuses.forEach((status) => {
      const { unmount } = renderWithTheme(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });

  it('deve manter o texto do status exatamente como recebido', () => {
    renderWithTheme(<StatusBadge status="Em manutenção" />);
    const badge = screen.getByText('Em manutenção');
    expect(badge).toHaveTextContent('Em manutenção');
  });

  it('não deve ter conteúdo adicional além do status', () => {
    renderWithTheme(<StatusBadge status="Ativo" />);
    const badge = screen.getByText('Ativo');
    expect(badge.textContent).toBe('Ativo');
  });
});