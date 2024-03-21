import { ModalProps } from '../../types/types';
import React from 'react';

interface ModalPropsWithEvent extends ModalProps {
  onClose: () => void;
  onMouseLeave?: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal = ({ imageUrl, show,  onMouseLeave, top, left, modalRef }: ModalPropsWithEvent) => {
  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0"
      style={{ pointerEvents: 'none' }} // Disable pointer events on the modal background
    >
      <div
        ref={modalRef}
        className="absolute shadow-lg rounded-md"
        style={{ top: `${top}px`, left: `${left}px`, width: 'auto', height: 'auto', pointerEvents: 'auto' }}
        onMouseLeave={handleMouseLeave} // Handle mouse leave from the modal
      >
        <img
          src={imageUrl}
          alt="Image"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'fill',
          }}
        />
      </div>
    </div>
  );
};

export { Modal };
