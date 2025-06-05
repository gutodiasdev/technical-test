import { AssetTable } from '@/components/AssetsTable';
import { renderWithTheme } from '@/setupTests';
import { Asset } from '@/types/asset';
import { fireEvent, screen } from '@testing-library/react';

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Notebook Dell Inspiron",
    category: "Equipamento",
    status: "Ativo",
    description: "Notebook para desenvolvimento",
    acquisitionDate: "2024-01-15",
    serialNumber: "DL123456789",
    supplier: "Dell Technologies",
    createdAt: new Date("2024-01-15T10:00:00.000Z"),
    updatedAt: new Date("2024-01-15T10:00:00.000Z")
  },
  {
    id: "3",
    name: "Microsoft Office 365",
    category: "Software",
    status: "Ativo",
    description: "Pacote de produtividade Microsoft",
    acquisitionDate: "2024-03-01",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    licenseExpiration: "2025-03-01",
    createdAt: new Date("2024-03-01T08:00:00.000Z"),
    updatedAt: new Date("2024-03-01T08:00:00.000Z")
  },
]

it('deve renderizar os nomes dos ativos na tabela', () => {
  renderWithTheme(
    <AssetTable
      assets={mockAssets}
      sortConfig={null}
      onSort={jest.fn()}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
    />
  );

  expect(screen.getByText('Notebook Dell Inspiron')).toBeInTheDocument();
  expect(screen.getByText('Microsoft Office 365')).toBeInTheDocument();
});

it('deve exibir mensagem de estado vazio quando não há ativos', () => {
  renderWithTheme(
    <AssetTable
      assets={[]}
      sortConfig={null}
      onSort={jest.fn()}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
    />
  );

  expect(screen.getByText('Nenhum ativo encontrado.')).toBeInTheDocument();
});

it('deve chamar onSort com a chave correta ao clicar em um cabeçalho', () => {
  const onSort = jest.fn();

  renderWithTheme(
    <AssetTable
      assets={mockAssets}
      sortConfig={null}
      onSort={onSort}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
    />
  );

  fireEvent.click(screen.getByText(/Nome/));
  expect(onSort).toHaveBeenCalledWith('name');
});

it('deve exibir informações específicas conforme a categoria do ativo', () => {
  renderWithTheme(
    <AssetTable
      assets={mockAssets}
      sortConfig={null}
      onSort={jest.fn()}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
    />
  );

  expect(screen.getByText(/S\/N: DL123456789/)).toBeInTheDocument();
});

it('deve chamar onEdit e onDelete corretamente', () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  renderWithTheme(
    <AssetTable
      assets={[mockAssets[0]]}
      sortConfig={null}
      onSort={jest.fn()}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

  fireEvent.click(screen.getByText('Editar'));
  expect(onEdit).toHaveBeenCalledWith(mockAssets[0]);

  fireEvent.click(screen.getByText('Excluir'));
  expect(onDelete).toHaveBeenCalledWith(mockAssets[0]);
});

