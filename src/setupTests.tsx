import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const mockTheme = {};

export const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};