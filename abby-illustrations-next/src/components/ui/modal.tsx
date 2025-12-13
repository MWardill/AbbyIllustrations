import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ 
  isOpen, 
  title, 
  description, 
  children, 
  onClose 
}: ModalProps) {
  return (
    <dialog
      className="modal"
      open={isOpen}
    >
      <div className="modal-box w-full max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">{title}</h3>
        
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        <div className="py-4">
          {children}
        </div>

        <div className="modal-action">
          <button
            className="btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}