import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  onTransitionEnd?: () => void;
}

export default function Modal({ 
  isOpen, 
  title, 
  description, 
  children, 
  onClose,
  footer,
  onTransitionEnd
}: ModalProps) {
  return (
    <dialog
      className="modal"
      open={isOpen}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="modal-box w-full max-w-xl max-h-[90vh] flex flex-col">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">{title}</h3>
        
        {description && (
          <div className="text-sm text-gray-600 mb-4">{description}</div>
        )}

        <div className="py-4 overflow-y-auto flex-1">
          {children}
        </div>

        <div className="shrink-0 modal-action">
          {footer ? footer : (
            <button
              className="btn"
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}