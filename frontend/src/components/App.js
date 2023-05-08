import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoToolTip from "./InfoToolTip.js";

import api from "../utils/Api.js";
import { getContent, authorize, register } from "../utils/auth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [email, setEmail] = useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDelete, setIsConfirmationDelete] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [removedCardId, setRemovedCardId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationDelete(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleCardDeleteClick = (id) => {
    setIsConfirmationDelete(!isConfirmationDelete);
    setRemovedCardId(id);
  };

  function handleCardDelete(id) {
    setIsLoadingDelete(true);
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  }

  function handleUpdateUser(currentUserInfo) {
    setIsLoadingUser(true);
    api
      .changeUserInfo(currentUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingAvatar(false);
      });
  }

  const handleAddPlaceSubmit = (newData) => {
    setIsLoadingPlace(true);
    api
      .createCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingPlace(false);
      });
  };

  const handleRegistration = (data) => {
    return register(data)
      .then((data) => {
        setIsRegistred(true);
        setEmail(data.data.email);
        openInfoTooltip();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false);
        openInfoTooltip();
      });
  };

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        setEmail(data.data.email);
        handleTokenCheck();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip();
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    getContent(jwt)
      .then((data) => {
        setEmail(data.data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider
      value={
        currentUser
      }
    >
      <div>
        <div className="page">
          <Header
            loggedIn={isLoggedIn}
            userEmail={email}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              path="/sign-in"
              element={<Login onLogin={handleAuthorization} />}
            />

            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegistration} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  loggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onBasketClick={handleCardDeleteClick}
                  cards={cards}
                  email={email}
                  onSignOut={handleSignOut}
                />
              }
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoadingUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoadingAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoadingPlace}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <ConfirmationPopup
            isOpen={isConfirmationDelete}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            onLoading={isLoadingDelete}
          />

          <InfoToolTip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isRegistred}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
