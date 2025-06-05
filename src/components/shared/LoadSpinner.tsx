import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ size?: number }>`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  width: ${({ size = 40 }) => size}px;
  height: ${({ size = 40 }) => size}px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  color: #6c757d;
  font-size: 14px;
`;

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  text = 'Carregando...'
}) => {
  return (
    <LoadingContainer>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};