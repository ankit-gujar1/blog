import React, { useEffect, useState } from "react"
import { Navbar } from "./Navbar";
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const AddTest = () => {

    // const url="https://reminder-3jth.onrender.com/";
    const url="http://localhost:8080/";

    const [name, setName] = useState();

    const {user}=useAuthContext();

    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
            return;
        }

        if(user.role!=='user'){
            // console.log(user.role)
            navigate('/admin/home');
            return;
          }
    },[user])

    function addTest(e) {
        e.preventDefault();

        if(!user){
            // navigate('/login');
            return;
        }

        axios.post(url, {name}, {headers:{Authorization:'Bearer ' + user.token}})
        .then((r)=>{
            console.log(r.data);
            navigate('/');
        })
        .catch((e)=>{
            console.log(e.response.data.error);
        })

    }
    return (
        <div>
            <Navbar />
            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h1 className="text-center my-3">Add Test</h1>
                    <form onSubmit={addTest}>
                        <div className="mb-3">
                            {/* <label className="form-label">Enter Username</label> */}
                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-dark py-2 px-5">Add</button>
                        </div>

                        {/* {error && <div  className="text-danger">{error}</div>} */}

                    </form>
                </div>
            </div>
        </div>
    )
}