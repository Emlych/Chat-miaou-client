import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
const Header = ({ toggleModal, token, setUser }) => {
  return (
    <div className="header">
      <nav>
        <ul>
          {token ? (
            <li onClick={() => setUser(null)}>Disconnect</li>
          ) : (
            <li onClick={toggleModal}>Login/Sign In</li>
          )}

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat">Chatbox</Link>
          </li>
        </ul>
      </nav>
      <FontAwesomeIcon icon={faCat} className="icon" />
    </div>
  );
};

export default Header;
