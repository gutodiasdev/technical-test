import { AssetFilters } from '@/hooks/useAssetsFilters';
import { SortConfig } from '@/hooks/useAssetSorting';
import { Asset } from '@/types/asset';

export interface AssetQuery {
  filters?: AssetFilters;
  sort?: SortConfig;
  page?: number;
  limit?: number;
}

export interface AssetResponse {
  assets: Asset[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const buildAssetQueryString = (query: AssetQuery): string => {
  const params = new URLSearchParams();

  if (query.filters?.name) {
    params.append('name', query.filters.name);
  }
  if (query.filters?.category) {
    params.append('category', query.filters.category);
  }
  if (query.filters?.status) {
    params.append('status', query.filters.status);
  }
  if (query.sort?.key) {
    params.append('sortBy', query.sort.key);
    params.append('sortOrder', query.sort.direction);
  }
  if (query.page) {
    params.append('page', query.page.toString());
  }
  if (query.limit) {
    params.append('limit', query.limit.toString());
  }

  return params.toString();
};

export const fetchAssets = async (query: AssetQuery = {}): Promise<AssetResponse> => {
  const queryString = buildAssetQueryString(query);
  const url = `/api/assets${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }

  return response.json();
};

export const createAsset = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  const response = await fetch('/api/assets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error('Failed to create asset');
  }

  return response.json();
};

export const updateAsset = async (id: string, asset: Partial<Asset>): Promise<Asset> => {
  const response = await fetch(`/api/assets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error('Failed to update asset');
  }

  return response.json();
};

export const deleteAsset = async (id: string): Promise<void> => {
  const response = await fetch(`/api/assets/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete asset');
  }
};

export const applyFilters = (assets: Asset[], filters: AssetFilters): Asset[] => {
  return assets.filter(asset => {
    const matchesName = !filters.name ||
      asset.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesCategory = !filters.category ||
      asset.category === filters.category;
    const matchesStatus = !filters.status ||
      asset.status === filters.status;

    return matchesName && matchesCategory && matchesStatus;
  });
};

export const applySorting = (assets: Asset[], sort: SortConfig): Asset[] => {
  return [...assets].sort((a, b) => {
    const aValue = a[sort.key] as string;
    const bValue = b[sort.key] as string;

    if (aValue < bValue) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const applyPagination = (assets: Asset[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAssets = assets.slice(startIndex, endIndex);

  return {
    assets: paginatedAssets,
    total: assets.length,
    page,
    limit,
    totalPages: Math.ceil(assets.length / limit),
    hasNextPage: endIndex < assets.length,
    hasPrevPage: page > 1
  };
};

import { useCallback, useState } from 'react';

export const useServerSideAssets = () => {
  const [data, setData] = useState<AssetResponse>({
    assets: [],
    total: 0,
    page: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = useCallback(async (query: AssetQuery = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAssets(query);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewAsset = useCallback(async (asset: Omit<Asset, 'id'>) => {
    try {
      setLoading(true);
      await createAsset(asset);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create asset');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingAsset = useCallback(async (id: string, asset: Partial<Asset>) => {
    try {
      setLoading(true);
      await updateAsset(id, asset);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update asset');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingAsset = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteAsset(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete asset');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    loadAssets,
    createNewAsset,
    updateExistingAsset,
    deleteExistingAsset,
    clearError: () => setError(null)
  };
};