import { Asset } from '@/types/asset';
import { useCallback, useState } from 'react';

export interface SortConfig {
  key: keyof Asset;
  direction: 'asc' | 'desc';
}

export const useAssetSorting = (initialSort?: SortConfig) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort || null);

  const handleSort = useCallback((key: keyof Asset) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  return {
    sortConfig,
    handleSort,
    clearSort
  };
};