import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ urlbase, toggleModal, setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("message d'erreur à afficher =>", errorMessage);

  const submitLogin = async (event) => {
    event.preventDefault();
    if (!username || !password)
      setErrorMessage("All fields have to be completed");
    else {
      const userData = new FormData();
      userData.append("username", username);
      userData.append("password", password);
      try {
        const response = await axios.post(`${urlbase}/user/login`, userData);
        console.log("login response :", response.data);
        if (response.data.searchedUser.token) {
          setUser(response.data.searchedUser.token);
        }
        toggleModal();
        navigate("/chat");
      } catch (error) {
        console.log("error ==>", error);
      }
    }
  };
  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="warning">{errorMessage}</div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
