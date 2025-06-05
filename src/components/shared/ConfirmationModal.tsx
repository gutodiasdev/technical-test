import styled from 'styled-components';
import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const Message = styled.p`
  margin: 0;
  color: #495057;
  font-size: 14px;
  line-height: 1.5;
`;

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false
}) => {
  const footer = (
    <>
      <Button variant="secondary" onClick={onClose} disabled={loading}>
        {cancelText}
      </Button>
      <Button variant="danger" onClick={onConfirm} loading={loading}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <Message>{message}</Message>
    </Modal>
  );
};