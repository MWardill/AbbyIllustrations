import { ReactNode } from 'react';
import { default as Modal } from './Modal';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onTransitionEnd?: () => void;
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
  onTransitionEnd,
}: ConfirmCancelModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      onTransitionEnd={onTransitionEnd}
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
