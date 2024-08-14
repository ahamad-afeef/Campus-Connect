import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li>
          <Link to="posts/categories/:Placement">Placement</Link>
        </li>
        <li>
          <Link to="posts/categories/Holidays">Holidays</Link>
        </li>
        <li>
          <Link to="posts/categories/Events">Events</Link>
        </li>
        <li>
          <Link to="posts/categories/Semester">Semester</Link>
        </li>
        <li>
          <Link to="posts/categories/Students">Students</Link>
        </li>
        <li>
          <Link to="posts/categories/Management">Management</Link>
        </li>
        <li>
          <Link to="posts/categories/Culturals">Culturals</Link>
        </li>
        <li>
          <Link to="posts/categories/Department">Department</Link>
        </li>
        <li>
          <Link to="posts/categories/CIA Test">CIA Test</Link>
        </li>
        
      </ul>

      <div className="footer__copyright">
        <small>
          All Rights Reserved &copy; Copyright, Afeef Manas Parvez Fazil
        </small>
      </div>
    </footer>
  );
};

export default Footer;
