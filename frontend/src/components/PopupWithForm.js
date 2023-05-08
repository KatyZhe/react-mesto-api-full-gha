import React from "react";

const PopupWithForm = ({ name, title, isOpen, onClose, buttonText, onSubmit, children }) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          name={`${name}`}
          action="#"
          className="popup__form"
          onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">{buttonText}</button>
        </form>
        
      </div>
    </div>
  );
};

export default PopupWithForm