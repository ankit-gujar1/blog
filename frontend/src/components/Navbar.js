import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

export const Navbar = () => {

    const navigate=useNavigate();

    const { user,dispatch } = useAuthContext();

    function logoutUser(){
        dispatch({type:'LOGOUT'});
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <div className="mt-3" style={{backgroundColor:'white'}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:'white'}}>
                <div className="container-fluid" style={{backgroundColor:'white'}}>
                    <Link className="navbar-brand fs-2" to={'/'} style={{fontFamily:'Poetsen One'}}>SparkWaves</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-6" aria-current="page" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fs-6" aria-current="page" to={'/post-blog'}>Post Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fs-6" aria-current="page" to={'/my-blogs'}>My Blogs</Link>
                            </li>
                            <li className="nav-item pe-2">
                                <Link className="nav-link active fs-6" aria-current="page" to={'/popular-blogs'}>Popular Blogs</Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!user && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="btn btn-outline-dark me-2 rounded-pill px-4" aria-current="page" to={'/login'}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="btn btn-dark rounded-pill px-4" aria-current="page" to={'/signup'}>Signup</Link>
                                        </li>
                                    </>
                                )}

                                {user && (
                                    <>
                                        <li className="nav-item">
                                            <button className="btn btn-dark ms-2 rounded-pill px-4" onClick={logoutUser}>Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <style>{`
            .bg-body-tertiary {
                --bs-bg-opacity: 1;
                background-color: white !important;
              }
            `}</style>
        </div>
    )
}