import { ReactNode } from 'react';
import { default as Modal } from './Modal';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export function ConfirmCancelModal({
  isOpen,
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Ok',
  isDangerous = false,
}: ConfirmCancelModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={isDangerous ? 'btn btn-error' : 'btn btn-primary'}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      {children ?? <p>This action cannot be undone.</p>}
    </Modal>
  );
}
