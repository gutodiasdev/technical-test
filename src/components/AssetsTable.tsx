import { StatusBadge } from "@/components/shared/Badge";
import { Asset } from '@/types/asset';
import React from 'react';
import styled from 'styled-components';
import { SortConfig } from '../hooks/useAssetSorting';

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
`;

const TableHeader = styled.th<{ $sortable?: boolean }>`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  cursor: ${({ $sortable }) => $sortable ? 'pointer' : 'default'};
  
  ${({ $sortable }) => $sortable && `
    &:hover {
      background-color: #e9ecef;
    }
  `}
`;

const TableCell = styled.td`
  padding: 12px;
  color: #495057;
`;

const ActionsCell = styled(TableCell)`
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger'; size?: 'small' | 'medium' }>`
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

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6c757d;
`;

interface AssetTableProps {
  assets: Asset[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof Asset) => void;
  onEdit: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
}

export const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  sortConfig,
  onSort,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCategorySpecificInfo = (asset: Asset) => {
    switch (asset.category) {
      case 'Equipamento':
        return `S/N: ${asset.serialNumber}`;
      case 'Veículo':
        return `Placa: ${asset.licensePlate}`;
      case 'Software':
        return `Licença: ${formatDate(asset.licenseExpiration || '')}`;
      default:
        return '-';
    }
  };

  const getSortIcon = (key: keyof Asset) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader $sortable onClick={() => onSort('name')}>
              Nome{getSortIcon('name')}
            </TableHeader>
            <TableHeader $sortable onClick={() => onSort('category')}>
              Categoria{getSortIcon('category')}
            </TableHeader>
            <TableHeader $sortable onClick={() => onSort('status')}>
              Status{getSortIcon('status')}
            </TableHeader>
            <TableHeader $sortable onClick={() => onSort('acquisitionDate')}>
              Data de Aquisição{getSortIcon('acquisitionDate')}
            </TableHeader>
            <TableHeader>Informação Específica</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {assets.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyState>Nenhum ativo encontrado.</EmptyState>
              </td>
            </tr>
          ) : (
            assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell>
                  <StatusBadge status={asset.status} />
                </TableCell>
                <TableCell>{formatDate(asset.acquisitionDate)}</TableCell>
                <TableCell>{getCategorySpecificInfo(asset)}</TableCell>
                <ActionsCell>
                  <Button size="small" onClick={() => onEdit(asset)}>
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => onDelete(asset)}
                  >
                    Excluir
                  </Button>
                </ActionsCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};