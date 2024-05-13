import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "./Navbar";

const Login = () => {

    // const url="https://reminder-3jth.onrender.com/";
    const url = "http://localhost:8080/";

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const { user, dispatch } = useAuthContext();

    useEffect(() => {
        if (user) {
            navigate('/');
            return;
        }
    }, [user])

    function loginUser(e) {
        e.preventDefault();

        axios.post(url + 'login', { userName, password })
            .then((r) => {
                localStorage.setItem('user', JSON.stringify(r.data));
                dispatch({ type: 'LOGIN', payload: r.data }); //useAuthContext gets data from here
                navigate('/');
            })
            .catch((e) => {
                setError(e.response.data.error);
            })
    }

    return (
        <div>
            <div className="grid o-container row">
                <Navbar />
                <hr className="sketch-rule grid__item text-dark mt-4" />
                <div className="col-12">
                    <h1 className="mb-4 text-center" style={{ fontFamily: 'Poetsen One' }}>Login User</h1>
                </div>
            </div>


            <div className="row justify-content-center my-3 mx-2">
                <div className="col-md-6">
                    <form onSubmit={loginUser}>
                    <div class="form-floating mb-3">
                            {/* <label className="form-label">Enter Username</label> */}
                            <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" />
                            <label className='text-dark' for="floatingInput">Username</label>
                        </div>

                        <div class="form-floating mb-3">
                            {/* <label className="form-label">Enter Password</label> */}
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                            <label className='text-dark' for="floatingInput">Password</label>
                        </div>

                        <div className="text-center mt-3">
                            <button type="submit" className='btn btn-dark rounded-pill fs-5 px-5 py-1'>Post</button>
                        </div>

                        <div className="text-center my-2">
                            <span>If not already register </span><Link className="text-dark" to={'/signup'}>Signup</Link>
                        </div>

                        {error && <div className="text-danger">{error}</div>}

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
            }
            `}</style>
        </div>
    )
}

export default Login;