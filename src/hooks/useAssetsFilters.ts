import { useCallback, useState } from 'react';

export interface AssetFilters {
  name: string;
  category: '' | 'Equipamento' | 'Veículo' | 'Software';
  status: '' | 'Ativo' | 'Em manutenção' | 'Inativo';
}

export const useAssetFilters = (initialFilters?: Partial<AssetFilters>) => {
  const [filters, setFilters] = useState<AssetFilters>({
    name: '',
    category: '',
    status: '',
    ...initialFilters
  });

  const updateFilters = useCallback((newFilters: Partial<AssetFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ name: '', category: '', status: '' });
  }, []);

  const hasActiveFilters = filters.name !== '' || filters.category !== '' || filters.status !== '';

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters
  };
};