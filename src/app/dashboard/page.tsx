"use client";

import { AssetFilters } from '@/components/AssetFilters';
import { AssetPagination } from '@/components/AssetPagination';
import {
  ConfirmDeleteModal,
  CreateAssetModal,
  EditAssetModal
} from '@/components/AssetsModal';
import { AssetTable } from '@/components/AssetsTable';
import { Button } from '@/components/shared/Button';
import { useServerSideAssets } from '@/data/actions/asset';
import { removeTokenFromCookies } from '@/data/actions/auth';
import { useAssetManagement } from '@/hooks/useAssetManagement';
import { useAssetPagination } from '@/hooks/useAssetPagination';
import { useAssetFilters } from '@/hooks/useAssetsFilters';
import { useAssetSorting } from '@/hooks/useAssetSorting';
import { Asset } from "@/types/asset";
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  > div {
    display: flex;
    align-items: center;
    gap: 16px
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  color: #495057;
  font-size: 28px;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #6c757d;
`;

const ErrorContainer = styled.div`
  padding: 16px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 24px;
`;

export default function AssetManagementPage() {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useAssetFilters();
  const { sortConfig, handleSort } = useAssetSorting();
  const { pagination, goToPage, resetPage } = useAssetPagination(5);
  const {
    deleteConfirmModal,
    createModal,
    editModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal
  } = useAssetManagement();

  const {
    data,
    loading,
    error,
    loadAssets,
    createNewAsset,
    updateExistingAsset,
    deleteExistingAsset,
    clearError
  } = useServerSideAssets();

  const refreshAssets = useCallback(() => {
    loadAssets({
      filters,
      sort: sortConfig || undefined,
      page: pagination.page,
      limit: pagination.limit
    });
  }, [loadAssets, filters, sortConfig, pagination.page, pagination.limit]);

  useEffect(() => {
    refreshAssets();
  }, [refreshAssets]);

  const handleFiltersChange = useCallback((newFilters: Partial<typeof filters>) => {
    updateFilters(newFilters);
    resetPage();
  }, [updateFilters, resetPage]);

  const handleClearFilters = useCallback(() => {
    clearFilters();
    resetPage();
  }, [clearFilters, resetPage]);

  const handleCreateAsset = useCallback(async (assetData: Omit<Asset, 'id'>) => {
    try {
      await createNewAsset(assetData);
      closeCreateModal();
    } catch (error) {
      console.error('Erro ao criar ativo:', error);
    }
  }, [createNewAsset, closeCreateModal]);

  const handleEditAsset = useCallback(async (assetData: Asset) => {
    try {
      await updateExistingAsset(assetData.id, assetData);
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar ativo:', error);
    }
  }, [updateExistingAsset, closeEditModal]);

  const handleDeleteAsset = useCallback(async () => {
    if (!deleteConfirmModal.asset) return;

    try {
      await deleteExistingAsset(deleteConfirmModal.asset.id);
      closeDeleteConfirm();
      resetPage();
    } catch (error) {
      console.error('Erro ao deletar ativo:', error);
    }
  }, [deleteExistingAsset, deleteConfirmModal.asset, closeDeleteConfirm]);

  const handlePageChange = useCallback((page: number) => {
    goToPage(page);
  }, [goToPage]);

  const handleSortChange = useCallback((key: any) => {
    handleSort(key);
    resetPage();
  }, [handleSort, resetPage]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await removeTokenFromCookies();
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Ativos</PageTitle>
        <div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <Button onClick={openCreateModal} disabled={loading}>
            Adicionar Ativo
          </Button>
        </div>
      </PageHeader>
      {error && (
        <ErrorContainer>
          {error}
          <Button
            variant="secondary"
            onClick={clearError}
            style={{ marginLeft: '12px', padding: '4px 8px' }}
          >
            Fechar
          </Button>
        </ErrorContainer>
      )}
      <AssetFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
      {loading ? (
        <LoadingContainer>
          Carregando ativos...
        </LoadingContainer>
      ) : (
        <>
          <AssetTable
            assets={data.assets}
            sortConfig={sortConfig}
            onSort={handleSortChange}
            onEdit={openEditModal}
            onDelete={openDeleteConfirm}
          />
          {data.totalPages > 1 && (
            <AssetPagination
              pagination={{
                page: data.page,
                limit: pagination.limit,
                total: data.total,
                totalPages: data.totalPages
              }}
              onPageChange={handlePageChange}
              onPrevPage={() => handlePageChange(data.page - 1)}
              onNextPage={() => handlePageChange(data.page + 1)}
            />
          )}
        </>
      )}
      <ConfirmDeleteModal
        isOpen={deleteConfirmModal.isOpen}
        asset={deleteConfirmModal.asset}
        onConfirm={handleDeleteAsset}
        onCancel={closeDeleteConfirm}
      />
      <CreateAssetModal
        isOpen={createModal.isOpen}
        onSubmit={handleCreateAsset}
        onCancel={closeCreateModal}
      />
      <EditAssetModal
        isOpen={editModal.isOpen}
        asset={editModal.asset}
        onSubmit={handleEditAsset}
        onCancel={closeEditModal}
      />
    </PageContainer>
  );
}