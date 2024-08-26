import React, { useState } from "react";
import {Link} from "react-router-dom";
import Avatar1 from "../images/1.jpg";
import Avatar2 from "../images/2.jpeg";
import Avatar3 from "../images/1.jpg";
import Avatar4 from "../images/2.jpeg";
import Avatar5 from "../images//1.jpg";

const authorsData = [
  { id: 1, avatar: Avatar1, name: "Ahamad Afeef", posts: 3 },
  { id: 2, avatar: Avatar2, name: "Mohamed Manas", posts: 3 },
  { id: 3, avatar: Avatar3, name: "Mohamed Parvez", posts: 3 },
  { id: 4, avatar: Avatar4, name: "Mohamed Fazil", posts: 3 },
  { id: 5, avatar: Avatar5, name: "Muthu Karthikeyan", posts: 3 },
];
const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="authors">
      {authors.length > 0 ? 
        <div className="container authors__container">
          {authors.map(({id, avatar, name, posts}) => {
            return (
              <Link key = {id} to={`./posts/users/${id}`}>
                <div className="author__avatar">
                  <img src={avatar} alt={`Image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
       : 
        <h2 className="center"> No Users Found.</h2>
      }
    </section>
  );
};

export default Authors;
