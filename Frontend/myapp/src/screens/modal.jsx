import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div style={{padding:'70px'}}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;