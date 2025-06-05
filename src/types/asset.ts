export type AssetCategory = 'Equipamento' | 'Veículo' | 'Software';
export type AssetStatus = 'Ativo' | 'Em manutenção' | 'Inativo';

export interface BaseAsset {
  id: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  description?: string;
  acquisitionDate: string;
}

export interface Equipment extends BaseAsset {
  category: 'Equipamento';
  serialNumber: string;
  supplier: string;
}

export interface Vehicle extends BaseAsset {
  category: 'Veículo';
  licensePlate: string;
}

export interface Software extends BaseAsset {
  category: 'Software';
  licenseKey: string;
  licenseExpiration: string;
}

export type Asset = Equipment | Vehicle | Software;

export interface AssetFilters {
  name?: string;
  category?: AssetCategory;
  status?: AssetStatus;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
