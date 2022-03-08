import "./home.css";
import { Link } from "react-router-dom";

const Home = ({ toggleModal, token }) => {
  return (
    <div className="home">
      <div className="home__left">
        <h1>
          Chat <span>Miaou</span>
        </h1>
        <div className="home--description">
          <p>
            Online chatroom : Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Debitis, provident, eius ullam fugit ut, dignissimos quam
            veritatis pariatur veniam aspernatur dolor minus quos quibusdam
            similique in quidem hic unde minima.
          </p>
          {token ? (
            <Link to="/chat">
              <button>Get started</button>
            </Link>
          ) : (
            <button onClick={toggleModal}>Get started</button>
          )}
        </div>
      </div>
      <div className="home__right">
        <nav>
          <ul>
            <li>
              {token ? (
                <Link to="/chat">Get started</Link>
              ) : (
                <button onClick={toggleModal}>Get started</button>
              )}
            </li>
            <li>Our works</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
