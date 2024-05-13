import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const url = "http://localhost:8080/";

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [image, setImage] = useState();
    const [selectedImage, setselectedImage] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get(url + 'get-blog/' + id, { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                setTitle(r.data.title);
                setBody(r.data.body);
                setImage(r.data.image);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [user])

    const editBlog = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);

        axios.patch(url + 'edit-blog/' + id, formData, { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                console.log(r.data);
                navigate('/my-blogs');
            })
            .catch((e) => {
                console.log(e);
            })


    }

    return (
        <div className="mt-0 pt-0">
            <div className="grid o-container row">
                <Navbar />
                <hr className="sketch-rule grid__item text-dark mt-4" />
                <div className="col-12"><h1 className="mb-4 text-center" style={{ fontFamily: 'Poetsen One' }}>Share your story</h1></div>
                {/* <div className="col-6 d-flex justify-content-end h-25">
        <Link to={'/post-blog'} className="button" style={{ textDecoration: 'none' }}>Post<span className="button-span"> your story</span></Link> */}

                {/* </div> */}
            </div>
            <div className="row justify-content-center my-3 mx-2">
                <div className="col-md-6">
                    {/* <h3 className="text-center my-3" style={{fontFamily:'Poetsen One'}}>Share your story</h3> */}
                    <form onSubmit={editBlog} encType=" multipart/form-data">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control border border-3" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="name@example.com" />
                            <label className='text-dark' for="floatingInput">Blog Title</label>
                        </div>


                        <div className="form-floating">
                            <textarea className="form-control border border-3" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Leave a comment here" style={{ height: "250px" }}></textarea>
                            <label className='text-dark' for="floatingTextarea">Blog Description</label>
                        </div>

                        <div className="row flex-lg-row-reverse">
                          
                            {selectedImage && <div className="col-lg-6 col-12 card border border-0 mt-2">
                                <div className="recent-square-container m-auto mb-3 bg-dark border border-0 shadow-lg mb-3">
                                    {/* 608x780 */}
                                    <img className="card-img-top align-self-center" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={URL.createObjectURL(selectedImage)} alt="Card image" />
                                </div>
                            </div>}

                            {!selectedImage && image && <div className="col-lg-6 col-12 card border border-0 mt-2">
                                <div className="recent-square-container m-auto mb-3 bg-dark border border-0 shadow-lg mb-3">
                                    {/* 608x780 */}
                                    <img className="card-img-top align-self-center" style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={"http://localhost:8080/" + image} alt="Card image" />
                                </div>
                            </div>}

                            <div className='col-lg-6 col-12 m-auto'>
                                <label style={{ fontSize: "0.85rem" }} for="formFile" className="text-dark form-label mb-0 ms-1">Blog Image (crop image in 3:4 aspect ratio for beter results)</label>
                                <input name='image' className="form-control border border-3 py-3" type="file" onChange={(e) => {setImage(e.target.files[0]);setselectedImage(e.target.files[0])}} id="formFile" accept='image/*' />
                            </div>
                        </div>

                        <div className="text-center mt-3">
                            <button type="submit" className='btn btn-dark rounded-pill fs-5 px-5 py-1'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
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
              .search button[type="submit"] {
                right: 0; /* Adjust position for smaller screens */
              }
            
              .o-container{
                padding-left:1rem;
                padding-right:1rem;
              }

              .recent-square-container {
                width: 100%; /* adjust as needed */
                height: 31rem !important; /* adjust as needed */
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px;
              }
            
              .recent-square-container img {
                border-radius: 20px;
              }
            }

            .recent-square-container {
                width: 100%; /* adjust as needed */
                height: 29.6rem; /* adjust as needed */
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px;
              }
            
              .recent-square-container img {
                border-radius: 20px;
              }
            `}</style>
        </div>
    )
}

export default EditBlog
