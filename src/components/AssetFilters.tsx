import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { AssetFilters as IAssetFilters } from '@/hooks/useAssetsFilters';
import React from 'react';
import styled from 'styled-components';
import { Button } from "./shared/Button";

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 16px;
  align-items: start;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface AssetFiltersProps {
  filters: IAssetFilters;
  onFiltersChange: (filters: Partial<IAssetFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const AssetFilters: React.FC<AssetFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters
}) => {
  return (
    <FiltersContainer>
      <Input
        placeholder="Buscar por nome..."
        value={filters.name}
        onChange={(e) => onFiltersChange({ name: e.target.value })}
      />
      <Select
        value={filters.category}
        onChange={(e) => onFiltersChange({ category: e.target.value as any })}
        options={[
          { value: "", label: "Todas as categorias" },
          { value: "Equipamento", label: "Equipamento" },
          { value: "Veículo", label: "Veículo" },
          { value: "Software", label: "Software" },
        ]}
      />
      <Select
        value={filters.status}
        onChange={(e) => onFiltersChange({ status: e.target.value as any })}
        options={[
          { value: "", label: "Todos os status" },
          { value: "Ativo", label: "Ativo" },
          { value: "Em manutenção", label: "Em manutenção" },
          { value: "Inativo", label: "Inativo" },
        ]}
      />
      <Button
        variant="secondary"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        Limpar
      </Button>
    </FiltersContainer>
  );
};