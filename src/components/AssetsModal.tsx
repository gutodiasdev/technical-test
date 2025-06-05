import { AssetForm } from "@/components/AssetForm";
import { Asset } from '@/types/asset';
import React from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div<{ $width?: string }>`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: ${({ $width }) => $width || '800px'};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
`;

const DialogTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #495057;
`;

const ConfirmText = styled.p`
  margin: 0 0 24px 0;
  color: #6c757d;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #5a6268;
          }
        `;
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
        `;
      default:
        return `
          background-color: #007bff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0056b3;
          }
        `;
    }
  }}
`;

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  asset: Asset | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  asset,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !asset) return null;

  return (
    <Dialog onClick={onCancel}>
      <DialogContent $width="400px" onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <ConfirmText>
          Tem certeza que deseja excluir o ativo "{asset.name}"?
          Esta ação não pode ser desfeita.
        </ConfirmText>
        <DialogActions>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

interface CreateAssetModalProps {
  isOpen: boolean;
  onSubmit: (asset: Omit<Asset, 'id'>) => void;
  onCancel: () => void;
}

export const CreateAssetModal: React.FC<CreateAssetModalProps> = ({
  isOpen,
  onSubmit,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <Dialog onClick={onCancel}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Adicionar Novo Ativo</DialogTitle>
        <AssetForm
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

interface EditAssetModalProps {
  isOpen: boolean;
  asset: Asset | null;
  onSubmit: (asset: Asset) => void;
  onCancel: () => void;
}

export const EditAssetModal: React.FC<EditAssetModalProps> = ({
  isOpen,
  asset,
  onSubmit,
  onCancel
}) => {
  if (!isOpen || !asset) return null;

  return (
    <Dialog onClick={onCancel}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Editar Ativo</DialogTitle>
        <AssetForm
          asset={asset}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};