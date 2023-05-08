import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
    >
      <fieldset className="popup__input-container">
        <input
          type="url"
          className="popup__item popup__avatar-input"
          id="popup__avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}
          required
        />
        <span className="popup__span popup__avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;