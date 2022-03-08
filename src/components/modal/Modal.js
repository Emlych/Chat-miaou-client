//User and authentication

import "./modal.css";
import modalImg from "../../assets/undraw_loving_story_re_wo5x.svg";
import modalImg2 from "../../assets/undraw_people_re_8spw.svg";
import Login from "./Login";
import SignIn from "./SignIn";
import { useState } from "react";

const Modal = ({ toggleModal, urlbase, setUser }) => {
  const [login, setlogin] = useState(true);
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close"
          onClick={() => {
            toggleModal();
            document.body.style.overflow = "scroll";
          }}
        >
          &times;
        </button>
        <nav>
          <ul>
            <li
              className={login ? "nav-active" : "nav-disabled"}
              onClick={() => setlogin(true)}
            >
              Login
            </li>
            <li
              className={!login ? "nav-active" : "nav-disabled"}
              onClick={() => setlogin(false)}
            >
              Sign In
            </li>
          </ul>
        </nav>
        <div className="modal-container">
          <div>
            <img src={modalImg2} alt="tes" />
          </div>
          <div className="modal-form">
            {login ? (
              <Login
                urlbase={urlbase}
                toggleModal={toggleModal}
                setUser={setUser}
              />
            ) : (
              <SignIn
                urlbase={urlbase}
                toggleModal={toggleModal}
                setUser={setUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
