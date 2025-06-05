import { Asset } from '@/types/asset';
import { useCallback, useState } from 'react';

export const useAssetManagement = () => {
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    asset: Asset | null;
  }>({
    isOpen: false,
    asset: null
  });

  const [createModal, setCreateModal] = useState<{
    isOpen: boolean;
    asset: Asset | null;
  }>({
    isOpen: false,
    asset: null
  });

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    asset: Asset | null;
  }>({
    isOpen: false,
    asset: null
  });

  const openDeleteConfirm = useCallback((asset: Asset) => {
    setDeleteConfirmModal({ isOpen: true, asset });
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmModal({ isOpen: false, asset: null });
  }, []);

  const openCreateModal = useCallback(() => {
    setCreateModal({ isOpen: true, asset: null });
  }, []);

  const closeCreateModal = useCallback(() => {
    setCreateModal({ isOpen: false, asset: null });
  }, []);

  const openEditModal = useCallback((asset: Asset) => {
    setEditModal({ isOpen: true, asset });
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModal({ isOpen: false, asset: null });
  }, []);

  return {
    deleteConfirmModal,
    createModal,
    editModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal
  };
};