import { ConfirmDeleteModal, CreateAssetModal, EditAssetModal } from '@/components/AssetsModal';
import { renderWithTheme } from '@/setupTests';
import { Asset } from '@/types/asset';
import { fireEvent, screen } from '@testing-library/react';

const mockAsset: Asset = {
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
}

describe('ConfirmDeleteModal', () => {
  const setup = (isOpen = true, asset = mockAsset) => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    renderWithTheme(
      <ConfirmDeleteModal
        isOpen={isOpen}
        asset={asset}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    return { onConfirm, onCancel };
  };

  it('não deve renderizar se isOpen for false ou asset for null', () => {
    const { container } = renderWithTheme(
      <ConfirmDeleteModal
        isOpen={false}
        asset={mockAsset}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('deve exibir o nome do ativo e os botões Cancelar e Excluir', () => {
    setup();
    expect(screen.getByText(/excluir o ativo "Notebook Dell Inspiron"/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });

  it('deve chamar onConfirm ao clicar em Excluir', () => {
    const { onConfirm } = setup();
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }));
    expect(onConfirm).toHaveBeenCalled();
  });
});

describe('CreateAssetModal', () => {
  it('não deve renderizar se isOpen for false', () => {
    const { container } = renderWithTheme(
      <CreateAssetModal isOpen={false} onCancel={jest.fn()} onSubmit={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('deve renderizar o formulário com título "Adicionar Novo Ativo"', () => {
    renderWithTheme(
      <CreateAssetModal isOpen={true} onCancel={jest.fn()} onSubmit={jest.fn()} />
    );
    expect(screen.getByText(/adicionar novo ativo/i)).toBeInTheDocument();
  });

  it('deve chamar onCancel ao clicar fora do diálogo', () => {
    const onCancel = jest.fn();
    renderWithTheme(
      <CreateAssetModal isOpen={true} onCancel={onCancel} onSubmit={jest.fn()} />
    );

    fireEvent.click(screen.getByText(/adicionar novo ativo/i).closest('div')!.parentElement!);
    expect(onCancel).toHaveBeenCalled();
  });
});

describe('EditAssetModal', () => {
  it('não deve renderizar se isOpen for false ou asset for null', () => {
    const { container } = renderWithTheme(
      <EditAssetModal isOpen={false} asset={mockAsset} onCancel={jest.fn()} onSubmit={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();

    const { container: emptyContainer } = renderWithTheme(
      <EditAssetModal isOpen={true} asset={null} onCancel={jest.fn()} onSubmit={jest.fn()} />
    );
    expect(emptyContainer).toBeEmptyDOMElement();
  });

  it('deve renderizar o formulário com título "Editar Ativo"', () => {
    renderWithTheme(
      <EditAssetModal
        isOpen={true}
        asset={mockAsset}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByText(/editar ativo/i)).toBeInTheDocument();
  });

  it('deve chamar onCancel ao clicar fora do diálogo', () => {
    const onCancel = jest.fn();
    renderWithTheme(
      <EditAssetModal
        isOpen={true}
        asset={mockAsset}
        onCancel={onCancel}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText(/editar ativo/i).closest('div')!.parentElement!);
    expect(onCancel).toHaveBeenCalled();
  });
});
