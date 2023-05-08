import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ card, onCardClick, onBasketClick, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element_liked"
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleBasketClick = () => {
    onBasketClick(card._id);
  };

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__text">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__likes-count">{card.likes.length}</span>
        </div>
        {isOwn && (
          <button className="element__delete" onClick={handleBasketClick} />
        )}
      </div>
    </div>
  );
};

export default Card;
