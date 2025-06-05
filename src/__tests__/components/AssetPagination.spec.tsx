import { AssetPagination } from '@/components/AssetPagination';
import { renderWithTheme } from '@/setupTests';
import { fireEvent, screen } from '@testing-library/react';

const basePagination = {
  page: 2,
  limit: 10,
  total: 45,
  totalPages: 5,
};

describe('AssetPagination', () => {
  const setup = (pagination = basePagination) => {
    const onPrevPage = jest.fn();
    const onNextPage = jest.fn();
    const onPageChange = jest.fn();

    renderWithTheme(
      <AssetPagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    );

    return { onPrevPage, onNextPage, onPageChange };
  };

  it('deve renderizar a informação correta de itens e página atual', () => {
    setup();
    expect(screen.getByText(/mostrando 11 a 20 de 45 resultados/i)).toBeInTheDocument();
    expect(screen.getByText(/página 2 de 5/i)).toBeInTheDocument();
  });

  it('deve desabilitar botão "Anterior" na primeira página', () => {
    setup({ ...basePagination, page: 1 });
    const prevButton = screen.getByRole('button', { name: /anterior/i });
    expect(prevButton).toBeDisabled();
  });

  it('deve desabilitar botão "Próxima" na última página', () => {
    setup({ ...basePagination, page: 5 });
    const nextButton = screen.getByRole('button', { name: /próxima/i });
    expect(nextButton).toBeDisabled();
  });

  it('deve chamar onPrevPage ao clicar no botão "Anterior"', () => {
    const { onPrevPage } = setup();
    const prevButton = screen.getByRole('button', { name: /anterior/i });
    fireEvent.click(prevButton);
    expect(onPrevPage).toHaveBeenCalled();
  });

  it('deve chamar onNextPage ao clicar no botão "Próxima"', () => {
    const { onNextPage } = setup();
    const nextButton = screen.getByRole('button', { name: /próxima/i });
    fireEvent.click(nextButton);
    expect(onNextPage).toHaveBeenCalled();
  });

  it('não deve renderizar se o total for 0', () => {
    const { container } = renderWithTheme(
      <AssetPagination
        pagination={{ ...basePagination, total: 0 }}
        onPageChange={jest.fn()}
        onPrevPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
