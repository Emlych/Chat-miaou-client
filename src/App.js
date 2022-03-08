import "./App.css";

//import components
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Home from "./components/home/Home";
import Chatbox from "./components/chatbox/Chatbox";

//import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const urlbase = "http://localhost:4000";

function App() {
  //Open - close modal
  const [openModal, setopenModal] = useState(false);
  const toggleModal = () => setopenModal(!openModal);

  //Cookies, navigation
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    token
      ? Cookies.set("userToken", token, {
          expires: 5,
          sameSite: "none",
        })
      : Cookies.remove("userToken");
    setToken(token);
  };
  return (
    <div className="app">
      <Router>
        <Header toggleModal={toggleModal} token={token} setUser={setUser} />
        {openModal && (
          <Modal
            toggleModal={toggleModal}
            urlbase={urlbase}
            setUser={setUser}
          />
        )}
        <div className="app-page">
          <Routes>
            <Route
              path="/"
              element={<Home toggleModal={toggleModal} token={token} />}
            />
            <Route
              path="/chat"
              element={
                <Chatbox
                  token={token}
                  toggleModal={toggleModal}
                  urlbase={urlbase}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
