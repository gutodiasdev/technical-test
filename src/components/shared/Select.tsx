import { forwardRef } from 'react';
import styled from 'styled-components';
import { ErrorText } from './ErrorText';
import { HelperText } from './HelperText';
import { Label } from './Label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
}) <{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ hasError }) => hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, ...props }, ref) => {
    return (
      <SelectContainer>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledSelect ref={ref} hasError={!!error} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </SelectContainer>
    );
  }
);

Select.displayName = 'Select';