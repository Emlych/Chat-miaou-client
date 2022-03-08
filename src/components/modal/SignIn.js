import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ urlbase, toggleModal, setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("Beethoven");
  const [password, setPassword] = useState("Beethoven");
  const [checkPassword, setCheckPassword] = useState("Beethoven");
  const [avatar, setAvatar] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const submitSignIn = async (event) => {
    event.preventDefault();
    if (!username || !password)
      setErrorMessage("All fields have to be completed");
    if (password !== checkPassword)
      setErrorMessage("The two passwords have to be identical.");
    else {
      const userData = new FormData();
      userData.append("username", username);
      userData.append("password", password);
      userData.append("avatar", avatar);
      try {
        const response = await axios.post(`${urlbase}/user/signup`, userData);
        console.log("sign in response :", response.data);
        if (response.data.newUser.token) {
          setUser(response.data.newUser.token);
        }
        toggleModal();
        navigate("/chat");
      } catch (error) {
        console.log("error ==>", error);
      }
    }
  };
  return (
    <form onSubmit={submitSignIn}>
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
        <label htmlFor="avatar">Load your profile picture</label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={(event) => setAvatar(event.target.files[0])}
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
      <div>
        <label htmlFor="checkPassword">Check Password</label>
        <input
          type="password"
          name="checkPassword"
          placeholder="password"
          id="checkPassword"
          onChange={(event) => setCheckPassword(event.target.value)}
        />
      </div>
      <span className="warning">{errorMessage}</span>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
