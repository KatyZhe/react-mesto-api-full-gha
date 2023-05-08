import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function ConfirmationPopup({ card, onClose, isOpen, onSubmit, onLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="sure"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      hasInput={false}
      buttonText={onLoading ? "Удаление..." : "Да"}
    >
    </PopupWithForm>
  );
}

export default ConfirmationPopup;