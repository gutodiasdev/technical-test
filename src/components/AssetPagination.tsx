import React from 'react';
import styled from 'styled-components';
import { PaginationConfig } from '../hooks/useAssetPagination';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PaginationInfo = styled.div`
  color: #6c757d;
  font-size: 14px;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PageInfo = styled.span`
  margin: 0 16px;
  color: #495057;
  font-size: 14px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary'; size?: 'small' }>`
  padding: ${({ size }) => size === 'small' ? '6px 12px' : '8px 16px'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ size }) => size === 'small' ? '12px' : '14px'};
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface AssetPaginationProps {
  pagination: PaginationConfig;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const AssetPagination: React.FC<AssetPaginationProps> = ({
  pagination,
  onPageChange,
  onPrevPage,
  onNextPage
}) => {
  if (pagination.total === 0) return null;
  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <PaginationContainer>
      <PaginationInfo>
        Mostrando {startItem} a {endItem} de {pagination.total} resultados
      </PaginationInfo>
      <PaginationControls>
        <Button
          variant="secondary"
          size="small"
          disabled={pagination.page === 1}
          onClick={onPrevPage}
        >
          Anterior
        </Button>
        <PageInfo>
          Página {pagination.page} de {pagination.totalPages}
        </PageInfo>
        <Button
          variant="secondary"
          size="small"
          disabled={pagination.page === pagination.totalPages}
          onClick={onNextPage}
        >
          Próxima
        </Button>
      </PaginationControls>
    </PaginationContainer>
  );
};