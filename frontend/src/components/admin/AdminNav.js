import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext";

export const AdminNav = () => {

    const navigate=useNavigate();

    const { user,dispatch } = useAuthContext();

    function logoutUser(){
        dispatch({type:'LOGOUT'});
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>AdminNav</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!user && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to={'/login'}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to={'/signup'}>Signup</Link>
                                        </li>
                                    </>
                                )}

                                {user && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page">welcome {user.userName}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}