import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: Record<string, unknown>
}

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 16px 24px;
          font-size: 16px;
        `;
      default:
        return css`
          padding: 12px 20px;
          font-size: 14px;
        `;
    }
  }}
  
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <StyledButton disabled={disabled || loading} {...props}>
      {loading ? 'Carregando...' : children}
    </StyledButton>
  );
};