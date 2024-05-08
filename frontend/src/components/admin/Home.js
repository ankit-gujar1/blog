import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import { AdminNav } from './AdminNav';
// import { Link } from 'react-router-dom'

const Home = () => {

    // const url="https://reminder-3jth.onrender.com/";
    const url = "http://localhost:8080/";

    const [test, setTest] = useState();
    const [users, setUsers] = useState();

    const { user } = useAuthContext();

    useEffect(() => {

        axios.get(url + "admin/test", { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                setTest(r.data);
            })
            .catch((e) => {
                console.log(e);
            })

        axios.get(url + "admin/users", { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                setUsers(r.data);
            })
            .catch((e) => {
                console.log(e);
            })

    },[user])
    return (
        <div>
            <AdminNav/>
            <h1 className='text-center'>Admin</h1>
            {test &&
                test.map((i) => //key should be in outer most div of .map
                    <div key={i._id} className="row justify-content-center m-2 mb-3">
                        <div className="col-md-6">
                            <div className="bg-danger bg-gradient rounded text-center text-light pb-3">

                                <p className="fs-2 px-2" style={{ paddingTop: 10, margin: 0 }}><i className="fa fa-user fs-3 pe-1"></i><i>{i.user_name}</i></p>

                                <p className="fs-2 px-2" style={{ margin: 0 }}><i className="fa fa-arrow-right fs-3 pe-1"></i><i>{i.name}</i></p>
                            </div>
                        </div>
                    </div>
                )
                
            }

            {users &&
                users.map((i)=>
                    <div key={i._id} className="row justify-content-center m-2 mb-3">
                        <div className="col-md-6">
                        <div className={i.role === 'user' ? "bg-secondary bg-gradient rounded text-center text-light pb-3" : "bg-info bg-gradient rounded text-center text-light pb-3"}>
                            <p>username:- {i.userName}</p>
                            {/* <p>password:- {i.password}</p> */}
                            <p>role:- {i.role}</p>
                        </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Home