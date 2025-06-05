import { StatusBadge } from '@/components/shared/Badge';
import { AssetStatus } from '@/types/asset';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('StatusBadge', () => {
  it('deve renderizar o badge com status "Ativo"', () => {
    render(<StatusBadge status="Ativo" />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve renderizar o badge com status "Em manutenção"', () => {
    render(<StatusBadge status="Em manutenção" />);
    expect(screen.getByText('Em manutenção')).toBeInTheDocument();
  });

  it('deve renderizar o badge com status "Inativo"', () => {
    render(<StatusBadge status="Inativo" />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve renderizar como elemento span', () => {
    render(<StatusBadge status="Ativo" />);
    const badge = screen.getByText('Ativo');
    expect(badge.tagName).toBe('SPAN');
  });

  it('deve aceitar todos os valores válidos de AssetStatus', () => {
    const statuses: AssetStatus[] = ['Ativo', 'Em manutenção', 'Inativo'];

    statuses.forEach((status) => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });

  it('deve manter o texto do status exatamente como recebido', () => {
    render(<StatusBadge status="Em manutenção" />);
    const badge = screen.getByText('Em manutenção');
    expect(badge).toHaveTextContent('Em manutenção');
  });

  it('não deve ter conteúdo adicional além do status', () => {
    render(<StatusBadge status="Ativo" />);
    const badge = screen.getByText('Ativo');
    expect(badge.textContent).toBe('Ativo');
  });
});