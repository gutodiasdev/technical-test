import { AssetForm } from '@/components/AssetForm';
import { renderWithTheme } from '@/setupTests';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('AssetForm', () => {
  const baseProps = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar campos básicos e botão de envio', () => {
    renderWithTheme(<AssetForm {...baseProps} />);
    expect(screen.getByLabelText(/Nome \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Aquisição \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar ativo/i })).toBeInTheDocument();
  });

  it('deve renderizar campos específicos para categoria "Equipamento"', async () => {
    renderWithTheme(<AssetForm {...baseProps} />);

    fireEvent.change(screen.getByLabelText(/categoria \*/i), {
      target: { value: 'Equipamento' },
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/número de série/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/fornecedor/i)).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios de equipamento e exibir erros', async () => {
    renderWithTheme(<AssetForm {...baseProps} />);
    fireEvent.change(screen.getByLabelText(/nome \*/i), {
      target: { value: 'Impressora' },
    });
    fireEvent.change(screen.getByLabelText(/categoria \*/i), {
      target: { value: 'Equipamento' },
    });
    fireEvent.change(screen.getByLabelText(/status \*/i), {
      target: { value: 'Ativo' },
    });
    fireEvent.change(screen.getByLabelText(/data de aquisição \*/i), {
      target: { value: '2024-06-01' },
    });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar ativo/i }));

    await waitFor(() => {
      expect(screen.getByText(/número de série é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/fornecedor é obrigatório/i)).toBeInTheDocument();
    });
  });


  it('deve submeter dados válidos para categoria "Software"', async () => {
    const onSubmit = jest.fn();
    renderWithTheme(<AssetForm {...baseProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/nome \*/i), {
      target: { value: 'Antivírus Pro' },
    });
    fireEvent.change(screen.getByLabelText(/categoria \*/i), {
      target: { value: 'Software' },
    });
    fireEvent.change(screen.getByLabelText(/status \*/i), {
      target: { value: 'Ativo' },
    });
    fireEvent.change(screen.getByLabelText(/data de aquisição \*/i), {
      target: { value: '2024-06-01' },
    });

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/chave de licença/i), {
        target: { value: 'LIC-123456' },
      });
      fireEvent.change(screen.getByLabelText(/validade da licença/i), {
        target: { value: '2025-06-01' },
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar ativo/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Antivírus Pro',
          category: 'Software',
          status: 'Ativo',
          acquisitionDate: '2024-06-01',
          licenseKey: 'LIC-123456',
          licenseExpiration: '2025-06-01',
        })
      );
    });
  });

  it('deve chamar onCancel ao clicar no botão Cancelar', () => {
    const onCancel = jest.fn();
    renderWithTheme(<AssetForm {...baseProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
