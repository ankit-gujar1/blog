import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const MyBlogs = () => {

  const url="https://blog-fotd.onrender.com/";
  // const url = "http://localhost:8080/";

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState();
  // const [display, setDisplay] = useState('block');

  const [likes, setLikes] = useState(0);
  const [disableLikeBtn, setDisableLikeBtn] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    // const u=JSON.parse(localStorage.getItem('user'));
    // console.log("hii from App.js");
    if (!user) {
      navigate("/login");
      return;
    }

    console.log(user.role);
    if (user.role !== "user") {
      navigate("/admin/home");
      return;
    }

    axios.get(url + "my-blogs", { headers: { Authorization: "Bearer " + user.token } })
      .then((r) => {
        setBlogs(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, likes]);

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

  // function getAllPopularBlogs() {
  //     axios.get(url + "popular-blogs", { headers: { Authorization: "Bearer " + user.token } })
  //         .then((r) => {
  //             setpopularBlogs(r.data);
  //             setDisplay('none');
  //         })
  //         .catch((e) => {
  //             console.log(e);
  //         });


  // }

  function deleteBlog(id) {
    axios.delete(url + "delete-blog/" + id, { headers: { Authorization: "Bearer " + user.token } })
      .then(() => {
        setLikes(likes + 1);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="mt-0 pt-0">
      {/* <div className="o-container"> */}
      <div className="grid o-container row">
        <Navbar />
        <hr className="sketch-rule grid__item text-dark mt-4" />
        <div className="col-6"><h1 className="mb-4 ps-2" style={{ fontFamily: 'Poetsen One' }}>My blogs</h1></div>
        <div className="col-6 d-flex justify-content-end h-25">
          <Link to={'/post-blog'} className="button" style={{ textDecoration: 'none' }}>Post<span className="button-span"> your story</span></Link>

        </div>
      </div>

      <div className="row m-0 o-container">
        {blogs &&
          blogs.map((i) => (

            <div key={i._id} className="col-lg-3 col-md-6 col-sm-6 col-11 mb-3 m-auto">
              <div id="btn-message" className="button-message">
                <div className="content-avatar">
                  <div className="avatar">
                    <img className="user-img bg-dark" style={{ width: '40px', objectFit: 'contain' }} src={url + i.postedBy.dp}></img>
                  </div>
                </div>
                <div className="notice-content">
                  <div className="user-id fs-6 m-auto">@{i.postedBy.userName}</div>
                </div>
              </div>
              <div className="card border border-0">
                <Link to={'/view-blog/'+i._id}>
                  <div className="recent-square-container mb-3 bg-dark border border-0 shadow-lg mb-3">
                    {/* 608x780 */}
                    <img className="card-img-top align-self-center" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={url + i.image} alt="Card image" />
                  </div>
                </Link>

                <div className="row">
                  <div className="col-6">
                    <button className="Btn ms-1 p-0 m-0" onClick={() => handleLike(i._id)} disabled={disableLikeBtn}>
                      <span className="leftContainer rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>
                      </span>
                      <span className="likeCount rounded">
                        {i.likes}
                      </span>
                    </button>
                  </div>
                  <div className="col-6 m-auto d-flex justify-content-end pe-3">
                    <span className="" style={{ fontSize: "15px" }}>
                      {formatDistanceToNow(new Date(i.createdAt)).replace('about', '')}<span> ago</span>
                    </span>
                  </div>
                </div>
                <div className="card-body p-0 ms-1 py-3">
                  <Link to={'/view-blog/'+i._id} className="text-dark" style={{ textDecoration: 'none' }}><h5 className="card-title">{i.title}</h5></Link>

                  <div className="row">
                    <div className="col-6">
                      <Link to={'/edit-blog/' + i._id} className="edit-button m-auto">
                        <svg className="edit-svgIcon" viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                      </Link>
                    </div>
                    <div className="col-6">
                      <button className="delete-button m-auto" onClick={() => deleteBlog(i._id)}>
                        <svg className="delete-svgIcon" viewBox="0 0 448 512">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* <p>{i.body.split('\n').map((j) => (
                      <p>{j}</p>
                    ))}</p> */}


                </div>
              </div>

            </div>
          ))}

        {/* <div className="text-center" style={{ display: display }}>
                        <button className="btn btn-dark btn-lg rounded-pill px-4" onClick={getAllPopularBlogs} >View More</button>
                    </div> */}
      </div>

      {/* </div> */}

        <Footer />
      {/* <div className="grid o-container row">
        <hr className="sketch-rule grid__item text-dark mt-4" />
      </div> */}

      <style>{`

.delete-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.delete-svgIcon {
  width: 15px;
  transition-duration: 0.3s;
}

.delete-svgIcon path {
  fill: white;
}

.delete-button:hover {
  width: 120px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.delete-button:hover .delete-svgIcon {
  width: 20px;
  transition-duration: 0.3s;
  transform: translateY(60%);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}

.delete-button::before {
  display: none;
  content: "Delete";
  color: white;
  transition-duration: 0.3s;
  font-size: 2px;
}

.delete-button:hover::before {
  display: block;
  padding-right: 10px;
  font-size: 13px;
  opacity: 1;
  transform: translateY(0px);
  transition-duration: 0.3s;
}

.edit-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  text-decoration: none !important;
}

.edit-svgIcon {
  width: 17px;
  transition-duration: 0.3s;
}

.edit-svgIcon path {
  fill: white;
}

.edit-button:hover {
  width: 120px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.edit-button:hover .edit-svgIcon {
  width: 20px;
  transition-duration: 0.3s;
  transform: translateY(60%);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}

.edit-button::before {
  display: none;
  content: "Edit";
  color: white;
  transition-duration: 0.3s;
  font-size: 2px;
}

.edit-button:hover::before {
  display: block;
  padding-right: 10px;
  font-size: 13px;
  opacity: 1;
  transform: translateY(0px);
  transition-duration: 0.3s;
}



.button {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #151515;
    color: #eee;
    border-radius: 7px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
  }
  
  .button:hover {
    transform: translateY(-3px);
  }
  
  .button-span {
    color: #aaa;
  }
  

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


      .search {
        display: inline-block;
        position: relative;
      }
      
      .search input[type="text"] {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 20px;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
      }

      .search input[type="text"]:focus {
        outline: none; /* Remove default blue outline */
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.2); /* Set your desired box shadow */
      }
      
      .search button[type="submit"] {
        // background-color: #332D2D;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 10px 50px;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        right: -28%;
        transition: .9s ease;

      }
      

      .o-container{
    padding-left:3rem;
    padding-right:3rem;
  }

      
@media screen and (max-width: 768px) {
  .search button[type="submit"] {
    right: 0; /* Adjust position for smaller screens */
  }

  .o-container{
    padding-left:1rem;
    padding-right:1rem;
  }

  .recent-square-container {
    width: 100%; /* adjust as needed */
    height: 27rem !important; /* adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }

  .recent-square-container img {
    border-radius: 20px;
  }

  .square-container {
    width: 100%; /* adjust as needed */
    height: 21.7rem !important; /* adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
  .square-container img {
    border-radius: 20px;
  }
}

.recent-square-container {
    width: 100%; /* adjust as needed */
    height: 28rem; /* adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }

  .recent-square-container img {
    border-radius: 20px;
  }

.square-container {
    width: 100%; /* adjust as needed */
    height: 28rem; /* adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }

  .square-container img {
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
  
  
  }

      
      `}</style>
    </div>
  )
}

export default MyBlogs
