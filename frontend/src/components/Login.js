import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "./Navbar";

const Login=()=>{

    // const url="https://reminder-3jth.onrender.com/";
    const url="http://localhost:8080/";

    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();

    const navigate=useNavigate();

    const [error,setError]=useState(null);

    const {user,dispatch}=useAuthContext();

    useEffect(()=>{
        if(user){
            navigate('/');
            return;
        }
    },[user])

    function loginUser(e){
        e.preventDefault();

        axios.post(url+'login',{userName,password})
        .then((r)=>{
            localStorage.setItem('user',JSON.stringify(r.data));
            dispatch({type:'LOGIN',payload:r.data}); //useAuthContext gets data from here
            navigate('/');
        })
        .catch((e)=>{
            setError(e.response.data.error);
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h1 className="text-center my-3">Login User</h1>
                    <form onSubmit={loginUser}>
                        <div className="mb-3">
                            {/* <label className="form-label">Enter Username</label> */}
                            <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username"/>
                        </div>

                        <div className="mb-3">
                            {/* <label className="form-label">Enter Password</label> */}
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5">Login</button>
                        </div>

                        <div className="text-center my-2">
                            <span>If not already register </span><Link to={'/signup'}>Signup</Link>
                        </div>

                        {error && <div  className="text-danger">{error}</div>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;