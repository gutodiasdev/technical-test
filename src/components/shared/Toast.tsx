import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ type: ToastProps['type']; isClosing: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${({ isClosing }) => isClosing ? slideOut : slideIn} 0.3s ease;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        `;
      case 'error':
        return `
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        `;
      case 'info':
        return `
          background-color: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        `;
      default:
        return `
          background-color: #e2e3e5;
          color: #495057;
          border: 1px solid #d6d8db;
        `;
    }
  }}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-left: 12px;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <ToastContainer type={type} isClosing={isClosing}>
      {message}
      <CloseButton onClick={handleClose}>&times;</CloseButton>
    </ToastContainer>
  );
};