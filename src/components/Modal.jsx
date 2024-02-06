import React from "react";
import "../styles/Modal.css";
const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <img
          src={image.url}
          alt={`Full Size ${image.id}`}
          className="modal-image"
        />
      </div>
    </div>
  );
};

export default Modal;
