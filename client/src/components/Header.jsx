import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  return (
    <div>
      <nav>
        <div className="container nav__container">
          <Link to="/" className="nav__logo">
            <img src="" alt="Navbar Logo" />
          </Link>
          <ul className="nav__menu">
            <li>
              <Link to="/profile/sdfsdf">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
          <button className="nav__toggle-btn">
            <AiOutlineClose />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
