import { useCallback, useState } from 'react';

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useAssetPagination = (limit: number = 5) => {
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    limit,
    total: 0,
    totalPages: 0
  });

  const updatePagination = useCallback((total: number) => {
    const totalPages = Math.ceil(total / pagination.limit);
    setPagination(prev => ({
      ...prev,
      total,
      totalPages,
      page: Math.min(prev.page, Math.max(1, totalPages))
    }));
  }, [pagination.limit]);

  const goToPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const resetPage = useCallback(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages)
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      page: Math.max(prev.page - 1, 1)
    }));
  }, []);

  return {
    pagination,
    updatePagination,
    goToPage,
    resetPage,
    nextPage,
    prevPage
  };
};