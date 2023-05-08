import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profilename"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          className="popup__item popup__item_name_input"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          id="popup__name-input"
          onChange={handleChangeName}
          value={name || ''}
          required
        />
        <span className="popup__span popup__name-input-error"></span>
        <input
          type="text"
          className="popup__item popup__item_job_input"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          id="popup__job-input"
          onChange={handleChangeDescription}
          value={description || ''}
          required
        />
        <span className="popup__span popup__job-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
