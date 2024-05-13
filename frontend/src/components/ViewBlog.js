import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const ViewBlog = () => {

  const url = "https://blog-fotd.onrender.com/";
  // const url = "http://localhost:8080/";

  const navigate = useNavigate();

  const [blog, setBlog] = useState();
  const [likes, setLikes] = useState(0);
  const [disableLikeBtn, setDisableLikeBtn] = useState(false);

  const { user } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    axios.get(url + 'get-blog/' + id, { headers: { Authorization: 'Bearer ' + user.token } })
      .then((r) => {
        setBlog(r.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [user, likes])

  function handleLike(id) {
    axios.put(url + "like-blog/" + id, {}, { headers: { Authorization: "Bearer " + user.token } })
      .then(() => {
        // console.log("liked");
        setLikes(likes + 1);
        setDisableLikeBtn(false);
        // console.log(likes);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="mt-0 pt-0">
      {blog &&
        <div className="grid o-container row">
          <Navbar />
          <hr className="sketch-rule grid__item text-dark mt-4" />
          <div className="col-12">
            <h1 className="mb-4 text-center" style={{ fontFamily: 'Poetsen One' }}>{blog.title}</h1></div>
          {/* <div className="col-6 d-flex justify-content-end h-25">
        <Link to={'/post-blog'} className="button" style={{ textDecoration: 'none' }}>Post<span className="button-span"> your story</span></Link> */}

          {/* </div> */}

          <div className="col-12 recent-square-container bg-dark border border-0 shadow-lg m-auto">
            {/* 608x780 */}
            <img className="card-img-top align-self-center" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={"http://localhost:8080/" + blog.image} alt="Card image" />
          </div>

          <p className="mt-4 mb-0 pb-0 text-justify">{blog.body.split('\n').map((j) => (
            <p>{j}</p>
          ))}</p>

          <div className="col-6 m-auto d-flex justify-content-end">
            <button className="Btn ms-1 p-0 m-0" onClick={() => handleLike(blog._id)} disabled={disableLikeBtn}>
              <span className="leftContainer rounded">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>
              </span>
              <span className="likeCount rounded">
                {blog.likes}
              </span>
            </button>
          </div>

          <div className="col-6 m-auto">
            <div id="btn-message" className="button-message">
              <div className="content-avatar">
                <div className="avatar">
                  <Link style={{ textDecoration: 'none' }}><img className="user-img bg-dark" style={{ width: '40px', objectFit: 'contain' }} src={"http://localhost:8080/" + blog.postedBy.dp}></img></Link>
                </div>
              </div>
              <div className="notice-content">
                <div className="user-id fs-6 m-auto">@{blog.postedBy.userName}</div>
              </div>
            </div>

          </div>
        </div>
      }

        <Footer />
      {/* <div className="grid o-container row">
        <hr className="sketch-rule grid__item text-dark mt-4" />
      </div> */}


      <style>{`
            .grid {
                max-width: 100%;
                margin: 0 auto;
                padding: 0;
              }
              
              .grid__item {
                grid-column: 3 / -3;
                width: 100%;
                direction: ltr;
              }
              
              hr {
                display: block;
                clear: both;
                width: 33%;
                height: 0.1rem;
                margin: 2em auto;
                padding: 0;
                border: 0;
                border-top: 0.1rem solid rgba(0, 0, 0, 0);
              }
              
              .sketch-rule {
                width: 100%;
                height: 0.4em;
                border: 0;
                background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 119 6'%3E%3Cpath d='M119 3.8c-60 2.5-33.5-7-119 0' fill='none' stroke='%231d2d35' stroke-width='2'/%3E%3C/svg%3E")
                  center/5em 100% repeat-x;
              }

              .o-container{
                padding-left:3rem;
                padding-right:3rem;
              }

              @media screen and (max-width: 768px) {
              
                .o-container{
                  padding-left:1rem;
                  padding-right:1rem;
                }

                .recent-square-container {
                    width: 100% !important; /* adjust as needed */
                    height: 16rem !important; /* adjust as needed */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 20px;
                  }
                
                  .recent-square-container img {
                    border-radius: 20px !important;
                  }

                }

                  .recent-square-container {
                    width: 50%; /* adjust as needed */
                    height: 28rem; /* adjust as needed */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 20px;
                  }
                
                  .recent-square-container img {
                    border-radius: 20px;
                  }


                  .Btn {
                    width: 100px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 5px;
                    overflow: hidden;
                    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.089);
                    cursor: pointer;
                    background-color: transparent;
                  }
                  
                  .leftContainer {
                    width: 50%;
                    height: 100%;
                    background-color: #332D2D;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                  }
                  
                  .leftContainer .like {
                    color: white;
                    font-weight: 600;
                  }
                  
                  .likeCount {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #332D2D;
                    font-weight: 600;
                    position: relative;
                    background-color: white;
                  }
                  
                  .likeCount::before {
                    height: 8px;
                    width: 8px;
                    position: absolute;
                    content: "";
                    background-color: rgb(255, 255, 255);
                    transform: rotate(45deg);
                    left: -4px;
                  }
                  
                  .Btn:hover .leftContainer {
                    background-color: "#000000";
                  }
                  
                  .Btn:active .leftContainer {
                    background-color: #000000;
                  }
                  
                  .Btn:active .leftContainer svg {
                    transform: scale(1.15);
                    transform-origin: top;
                  }

                  #btn-message {
                    --text-color: #000;
                    --bg-color-sup: #d2d2d2;
                    --bg-color: #f4f4f4;
                    --bg-hover-color: #ffffff;
                    --online-status: #00da00;
                    --font-size: 16px;
                    --btn-transition: all 0.2s ease-out;
                  }
                  
                  .button-message {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--bg-color);
                    border-radius: 68px;
                    padding: 6px 10px 6px 6px;
                    width: fit-content;
                    height: 40px;
                    border: 0;
                    overflow: hidden;
                    position: relative;
                    transition: var(--btn-transition);
                  }
                  
                  .button-message {
                    height: 56px;
                    padding: 8px 20px 8px 8px;
                    background-color: var(--bg-hover-color);
                    transition: var(--btn-transition);
                  }
                  
                  .button-message:active {
                    transform: scale(0.99);
                  }
                  
                  .content-avatar {
                    width: 30px;
                    height: 30px;
                    margin: 0;
                    transition: var(--btn-transition);
                    position: relative;
                  }
                  
                  .button-message .content-avatar {
                    width: 40px;
                    height: 40px;
                  }
                  
                  .avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: var(--bg-color-sup);
                  }
                  
                  .user-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                  
                  .status-user {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    right: 1px;
                    bottom: 1px;
                    border-radius: 50%;
                    outline: solid 2px var(--bg-color);
                    background-color: var(--online-status);
                    transition: var(--btn-transition);
                    animation: active-status 2s ease-in-out infinite;
                  }
                  
                  .button-message:hover .status-user {
                    width: 10px;
                    height: 10px;
                    right: 1px;
                    bottom: 1px;
                    outline: solid 3px var(--bg-hover-color);
                  }
                  
                  .notice-content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    padding-left: 8px;
                    text-align: initial;
                    color: var(--text-color);
                  }
                  
                  .username {
                    
                    letter-spacing: -6px;
                    height: 0;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: var(--btn-transition);
                  }
                  
                  .user-id {
                    font-size: 12px;
                    letter-spacing: -6px;
                    height: 0;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: var(--btn-transition);
                  }
                  
                  .lable-message {
                    display: flex;
                    align-items: center;
                    opacity: 1;
                    transform: scaleY(1);
                    transition: var(--btn-transition);
                  }
                  
                  .button-message .username {
                    height: auto;
                    letter-spacing: normal;
                    opacity: 1;
                    transform: translateY(0);
                    transition: var(--btn-transition);
                  }
                  
                  .button-message .user-id {
                    height: auto;
                    letter-spacing: normal;
                    opacity: 1;
                    transform: translateY(0);
                    transition: var(--btn-transition);
                  }
            
            `}</style>
    </div>
  )
}

export default ViewBlog
