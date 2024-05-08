import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import axios from "axios";

function App() {

  // const url="https://reminder-3jth.onrender.com/";
  const url="http://localhost:8080/";

  const navigate = useNavigate();

  const [name, setName] = useState();

  // const [color,setColor]=useState();

  const { user } = useAuthContext();

  // console.log(x)
  useEffect(() => {
    // const u=JSON.parse(localStorage.getItem('user'));
    // console.log("hii from App.js");
    if (!user) {
      navigate('/login');
      return;
    }
    
    console.log(user.role)
    if(user.role!=='user'){
      navigate('/admin/home');
      return;
    }

    axios.get(url, { headers: { Authorization: 'Bearer ' + user.token } })
      .then((r) => {
        setName(r.data);
      })
      .catch((e) => {
        console.log(e);
      })


  }, [user])

  return (
    <div>
      <Navbar />
      <div className="text-center mt-3">
        {user && <h1>welcome {user.userName}</h1>}
        <Link className="btn btn-dark btn-block px-5 py-2" to={'/add'}>Add Test</Link>
        <h3 className="text-center my-3">All Tasks</h3>
      </div>
      {name &&
        name.map((i) => //key should be in outer most div of .map
          <div key={i._id} className="row justify-content-center m-2 mb-3">
            <div className="col-md-5">
              <div className="bg-primary bg-gradient rounded text-center text-light pb-3">
                
                <p className="fs-4 px-2" style={{ paddingTop: 10, margin: 0 }}><i className="fa fa-arrow-right fs-4 pe-1"></i><b>{i.name}</b></p>
                <p className="fs-4 px-2" style={{ paddingTop: 10, margin: 0 }}><i className="fa fa-user fs-4 pe-1"></i><b>{i.user_name}</b></p>
                
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;