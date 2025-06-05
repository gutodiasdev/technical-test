import { AssetFilters } from '@/components/AssetFilters';
import { AssetFilters as IAssetFilters } from '@/hooks/useAssetsFilters';
import { renderWithTheme } from '@/setupTests';
import { fireEvent, screen } from '@testing-library/react';

describe('AssetFilters', () => {

  const mockFilters: IAssetFilters = {
    name: '',
    category: '',
    status: '',
  };

  const setup = (customFilters = {}, hasActiveFilters = false) => {
    const onFiltersChange = jest.fn();
    const onClearFilters = jest.fn();
    renderWithTheme(
      <AssetFilters
        filters={{ ...mockFilters, ...customFilters }}
        onFiltersChange={onFiltersChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    );

    return { onFiltersChange, onClearFilters };
  };

  it('deve renderizar os campos de filtro e botão', () => {
    setup();
    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpar/i })).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
  });

  it('deve chamar onFiltersChange ao digitar no campo de nome', () => {
    const { onFiltersChange } = setup();
    const input = screen.getByPlaceholderText('Buscar por nome...');
    fireEvent.change(input, { target: { value: 'Servidor' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ name: 'Servidor' });
  });

  it('deve chamar onFiltersChange ao selecionar uma categoria', () => {
    const { onFiltersChange } = setup();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Veículo' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ category: 'Veículo' });
  });

  it('deve chamar onFiltersChange ao selecionar um status', () => {
    const { onFiltersChange } = setup();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'Ativo' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ status: 'Ativo' });
  });

  it('deve chamar onClearFilters ao clicar no botão de limpar', () => {
    const { onClearFilters } = setup({}, true);
    const button = screen.getByRole('button', { name: /limpar/i });
    fireEvent.click(button);

    expect(onClearFilters).toHaveBeenCalled();
  });

  it('deve desabilitar o botão de limpar quando `hasActiveFilters` for false', () => {
    setup({}, false);
    const button = screen.getByRole('button', { name: /limpar/i });

    expect(button).toBeDisabled();
  });
});
