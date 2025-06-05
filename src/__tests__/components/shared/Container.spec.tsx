import { Container } from '@/components/shared/Container';
import { renderWithTheme } from '@/setupTests';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Container Component', () => {
  describe('Renderização básica', () => {
    it('deve renderizar uma div', () => {
      const { container } = renderWithTheme(<Container />);
      const containerElement = container.firstChild;

      expect(containerElement).toBeInTheDocument();
      expect(containerElement?.nodeName).toBe('DIV');
    });

    it('deve renderizar com conteúdo filho', () => {
      const { getByText } = renderWithTheme(
        <Container>
          <p>Conteúdo de teste</p>
        </Container>
      );

      expect(getByText('Conteúdo de teste')).toBeInTheDocument();
    });
  });

  describe('Propriedade $fullWidth', () => {
    it('deve ter max-width de 1200px por padrão', () => {
      const { container } = renderWithTheme(<Container />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('max-width: 1200px');
    });

    it('deve ter max-width de 100% quando $fullWidth é true', () => {
      const { container } = renderWithTheme(<Container $fullWidth />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('max-width: 100%');
    });

    it('deve ter max-width de 1200px quando $fullWidth é false', () => {
      const { container } = renderWithTheme(<Container $fullWidth={false} />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('max-width: 1200px');
    });
  });

  describe('Propriedade $padding', () => {
    it('deve ter padding de 20px por padrão', () => {
      const { container } = renderWithTheme(<Container />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 20px');
    });

    it('deve aplicar padding personalizado quando especificado', () => {
      const { container } = renderWithTheme(<Container $padding="40px" />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 40px');
    });

    it('deve aplicar padding com múltiplos valores', () => {
      const { container } = renderWithTheme(<Container $padding="10px 20px" />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 10px 20px');
    });

    it('deve aplicar padding com quatro valores', () => {
      const { container } = renderWithTheme(<Container $padding="10px 15px 20px 25px" />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 10px 15px 20px 25px');
    });
  });

  describe('Estilos básicos', () => {
    it('deve ter margin: 0 auto por padrão', () => {
      const { container } = renderWithTheme(<Container />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('margin: 0 auto');
    });

    it('deve manter margin: 0 auto mesmo com $fullWidth', () => {
      const { container } = renderWithTheme(<Container $fullWidth />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('margin: 0 auto');
    });
  });

  describe('Elemento #header interno', () => {
    it('deve aplicar estilos corretos ao elemento #header', () => {
      const { container } = renderWithTheme(
        <Container>
          <div id="header">Header content</div>
        </Container>
      );
      const headerElement = container.querySelector('#header') as HTMLElement;

      expect(headerElement).toHaveStyle(`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
      `);
    });

    it('deve aplicar estilos ao #header independente de outras props', () => {
      const { container } = renderWithTheme(
        <Container $fullWidth $padding="50px">
          <div id="header">Header with props</div>
        </Container>
      );
      const headerElement = container.querySelector('#header') as HTMLElement;

      expect(headerElement).toHaveStyle(`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
      `);
    });

    it('deve permitir múltiplos elementos com id header', () => {
      const { container } = renderWithTheme(
        <Container>
          <div id="header">First header</div>
          <div>
            <div id="header">Nested header</div>
          </div>
        </Container>
      );
      const headerElements = container.querySelectorAll('#header');

      expect(headerElements).toHaveLength(2);
      headerElements.forEach(header => {
        expect(header).toHaveStyle(`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        `);
      });
    });
  });

  describe('Media queries', () => {
    it('deve aplicar padding mobile em telas pequenas', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });
      const { container } = renderWithTheme(<Container />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 20px');
    });

    it('deve manter padding personalizado mesmo com media query', () => {
      const { container } = renderWithTheme(<Container $padding="30px" />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 30px');
    });
  });

  describe('Combinação de props', () => {
    it('deve aplicar $fullWidth e $padding juntos', () => {
      const { container } = renderWithTheme(
        <Container $fullWidth $padding="15px 25px" />
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle(`
        max-width: 100%;
        padding: 15px 25px;
        margin: 0 auto;
      `);
    });

    it('deve funcionar com todas as props e conteúdo', () => {
      const { container, getByText } = renderWithTheme(
        <Container $fullWidth $padding="10px">
          <div id="header">Header Test</div>
          <p>Body content</p>
        </Container>
      );
      const containerElement = container.firstChild as HTMLElement;
      const headerElement = container.querySelector('#header') as HTMLElement;

      expect(containerElement).toHaveStyle(`
        max-width: 100%;
        padding: 10px;
        margin: 0 auto;
      `);
      expect(headerElement).toHaveStyle(`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
      `);
      expect(getByText('Header Test')).toBeInTheDocument();
      expect(getByText('Body content')).toBeInTheDocument();
    });
  });

  describe('Props com valores falsy', () => {
    it('deve usar valores padrão quando props são undefined', () => {
      const { container } = renderWithTheme(
        <Container $fullWidth={undefined} $padding={undefined} />
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle(`
        max-width: 1200px;
        padding: 20px;
      `);
    });

    it('deve tratar string vazia de padding corretamente', () => {
      const { container } = renderWithTheme(<Container $padding="" />);
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement).toHaveStyle('padding: 20px');
    });
  });

  describe('Acessibilidade e estrutura', () => {
    it('deve manter a estrutura DOM correta', () => {
      const { container } = renderWithTheme(
        <Container>
          <div id="header">
            <h1>Title</h1>
            <nav>Navigation</nav>
          </div>
          <main>Main content</main>
        </Container>
      );

      expect(container.querySelector('#header h1')).toHaveTextContent('Title');
      expect(container.querySelector('#header nav')).toHaveTextContent('Navigation');
      expect(container.querySelector('main')).toHaveTextContent('Main content');
    });
  });
});