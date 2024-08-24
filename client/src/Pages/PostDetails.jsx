import React from 'react'
import PostAuthor from "../components/PostAuthor"
import { Link } from 'react-router-dom';


const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail_container">
        <div className="post-detail header">
          <PostAuthor />
          <div className="post-detail__buttons">
                <Link to={`/posts/werwer/edit`}></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetails
