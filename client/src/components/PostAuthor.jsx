 import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../images/Avator.jpg"
 
 const PostAuthor = () => {
   return (
     <Link to={ `/posts/users/sdfdf`} className='post__author'>
        <div className='post/users/sdfsdf'>
          <img src={Avatar} alt="" />
        </div>
        <div className='post__author-details'>
            <h5>By: MOHAMMED MANAS</h5>
            <small>Just No</small>
        </div>
     </Link>
   )
 }
 
 export default PostAuthor