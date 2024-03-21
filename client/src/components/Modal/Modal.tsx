import { ModalProps } from '../../types/types';
import React, { useEffect, useRef, useState } from 'react';

interface ModalPropsWithEvent extends ModalProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Modal = ({ imageUrl, show, onClose, onMouseMove, top, left }: ModalPropsWithEvent) => {
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      // Only set initial position, don't update it on cursor movement
      const initialModalStyle = {
        top: `${top}px`,
        left: `${left}px`,
        width: '200px', // Fixed width for the modal
        height: 'auto', // Fixed height for the modal
        pointerEvents: 'auto',
      };
      setModalStyle(initialModalStyle);
    }
  }, [show, top, left]); // Depend on show to update the modal's initial position

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || !onMouseMove) return;

    onMouseMove(event);
  };

  if (!show) return null;

  return (
    <div
      className="fixed z-50 inset-0"
      onClick={(onClose as unknown) as React.MouseEventHandler<HTMLDivElement>}
      style={{ pointerEvents: 'none' }} // Prevent modal background from catching mouse events
    >
      <div
        ref={modalRef}
        className="absolute"
        style={modalStyle}
        onMouseMove={handleMouseMove} // Handle mouse move over the modal
      >
        <img
          src={imageUrl}
          alt={""}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
