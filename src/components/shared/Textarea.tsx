import { forwardRef } from 'react';
import styled from 'styled-components';
import { ErrorText } from './ErrorText';
import { HelperText } from './HelperText';
import { Label } from './Label';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: prop => prop !== "hasError",
}) <{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ hasError }) => hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <TextareaContainer>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledTextarea ref={ref} hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </TextareaContainer>
    );
  }
);

Textarea.displayName = 'Textarea';