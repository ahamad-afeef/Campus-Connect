import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";

const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src="../images/blog4.jpg" alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
          minima enim totam, iure cumque vitae iusto accusamus quis sint vero a?
          Sit voluptatum aliquam laboriosam dolorum facilis est velit esse,
          accusamus hic! Voluptatem similique, voluptatibus doloremque eum
          praesentium vitae sapiente dolore quisquam eius aperiam obcaecati
          laudantium architecto. Quam, dolore debitis.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          culpa sunt nobis sint at ab tempora veniam porro, blanditiis vitae,
          non saepe illo vel doloribus omnis nihil ipsam harum voluptate
          nesciunt. Sunt commodi aliquam blanditiis, obcaecati recusandae
          debitis, a asperiores deserunt harum sequi odio optio? Distinctio
          cupiditate velit aut cum.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
          maiores ducimus, error nostrum cupiditate velit beatae porro autem
          sequi eius aut dolore inventore commodi mollitia? Maiores aut
          aspernatur alias earum perspiciatis ad? Esse modi ab aut minima
          eligendi ea soluta iste quam qui. Adipisci inventore provident quae,
          officia laudantium explicabo.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
          delectus ut, eius voluptatem hic debitis aspernatur, harum reiciendis
          est, tempora fugit quo eum asperiores quidem inventore. Aperiam fuga
          sint odio architecto tenetur et explicabo obcaecati corporis in harum
          vitae eaque amet, praesentium eius, incidunt reiciendis porro aliquid
          repudiandae necessitatibus nam!
        </p>
    
      </div>
    </section>
  );
};

export default PostDetails;
