import { forwardRef } from 'react';
import styled from 'styled-components';
import { Label } from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
}) <{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ hasError }) => hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

const HelperText = styled.span`
  color: #6c757d;
  font-size: 12px;
  margin-top: 4px;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <InputContainer>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledInput ref={ref} hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';