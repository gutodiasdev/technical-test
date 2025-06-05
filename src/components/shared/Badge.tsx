import styled from 'styled-components';
import { AssetStatus } from '../../types/asset';

interface StatusBadgeProps {
  status: AssetStatus;
}

const Badge = styled.span<{ status: AssetStatus }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  
  ${({ status }) => {
    switch (status) {
      case 'Ativo':
        return `
          background-color: #d4edda;
          color: #155724;
        `;
      case 'Em manutenção':
        return `
          background-color: #fff3cd;
          color: #856404;
        `;
      case 'Inativo':
        return `
          background-color: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background-color: #e2e3e5;
          color: #495057;
        `;
    }
  }}
`;

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <Badge status={status}>{status}</Badge>;
};