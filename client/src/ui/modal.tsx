import { ReactNode, useEffect } from "react";
import FocusTrap from "focus-trap-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  closeButtonText: string;
}

export const Modal = ({
  children,
  isOpen,
  handleClose,
  closeButtonText,
}: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: "#close-modal" }}>
      <div className="modal">
        <div className="modal-content">
          {children}
          <button onClick={handleClose} className="close-btn" id="close-modal">
            {closeButtonText}
          </button>
        </div>
      </div>
    </FocusTrap>
  );
};
