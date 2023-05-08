import React from "react";

const ImagePopup = ({ card, onClose }) => {
    return (
        <div className={`popup popup_large-img ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__container-image">
              <button type="button" className="popup__close" onClick={onClose}></button>
              <figure>
                <img src={card.link} className="popup__image" alt={card.name}/>
                  <figcaption className="popup__caption">{card.name}</figcaption>
              </figure>
            </div>
        </div>
    );
}

export default ImagePopup;