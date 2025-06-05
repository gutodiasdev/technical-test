import { AssetFilters } from '@/hooks/useAssetsFilters';
import { SortConfig } from '@/hooks/useAssetSorting';
import { apiService } from '@/services/ApiService';
import { Asset } from '@/types/asset';
import { useCallback, useState } from 'react';

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

export const buildAssetQueryString = (query: AssetQuery): Record<string, string | number | boolean> => {
  const params: Record<string, string | number | boolean> = {};
  if (query.filters?.name) {
    params['q'] = query.filters.name;
  }
  if (query.filters?.category) {
    params['category'] = query.filters.category;
  }
  if (query.filters?.status) {
    params['status'] = query.filters.status;
  }
  if (query.sort?.key) {
    params['_sort'] = query.sort.key;
    params['_order'] = query.sort.direction;
  }
  if (query.page && query.limit) {
    params['_page'] = query.page;
    params['_limit'] = query.limit;
  }

  return params;
};

export const fetchAssets = async (query: AssetQuery = {}): Promise<AssetResponse> => {
  try {
    const queryParams = buildAssetQueryString(query);
    const response = await apiService.request<Asset[]>({
      path: '/assets',
      queryParams,
      authorization: true
    });
    const assets = Array.isArray(response) ? response : [];
    const total = assets.length;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      assets,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  } catch (error) {
    throw new Error("Falha ao carregar os Ativos. Tente novamente.");
  }
};

export const createAsset = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  const id = crypto.randomUUID();
  try {
    const newAsset = {
      ...asset,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const response = await apiService.request<Asset>({
      method: 'POST',
      path: '/assets',
      body: newAsset,
      authorization: true
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateAsset = async (id: string, asset: Partial<Asset>): Promise<Asset> => {
  try {
    const updatedAsset = {
      ...asset,
      updatedAt: new Date().toISOString()
    };
    const response = await apiService.request<Asset>({
      method: 'PUT',
      path: `/assets/${id}`,
      body: updatedAsset,
      authorization: true
    });

    return response;
  } catch (error) {
    throw new Error('Falha ao atualizar o ativo. Tente novamente.');
  }
};

export const deleteAsset = async (id: string): Promise<void> => {
  try {
    await apiService.request({
      method: 'DELETE',
      path: `/assets/${id}`,
      authorization: true
    });
  } catch (error) {
    throw new Error('Falha ao excluir o ativo. Tente novamente.');
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
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os ativos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewAsset = useCallback(async (asset: Omit<Asset, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newAsset = await createAsset(asset);
      await loadAssets();

      return newAsset;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar o ativo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadAssets]);

  const updateExistingAsset = useCallback(async (id: string, asset: Partial<Asset>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAsset = await updateAsset(id, asset);
      await loadAssets();

      return updatedAsset;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar o ativo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadAssets]);

  const deleteExistingAsset = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteAsset(id);
      await loadAssets();

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao excluir o ativo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadAssets]);

  const refreshAssets = useCallback(async () => {
    await loadAssets();
  }, [loadAssets]);

  return {
    data,
    loading,
    error,
    loadAssets,
    createNewAsset,
    updateExistingAsset,
    deleteExistingAsset,
    refreshAssets,
    clearError: () => setError(null)
  };
};