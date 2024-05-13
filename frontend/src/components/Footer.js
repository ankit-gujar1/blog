import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="">
            <div className="grid o-container row">
                <hr className="sketch-rule grid__item text-dark mt-4" />
                {/* <Footer /> */}
            </div>
            <footer className="text-center mb-3">
                {/* <p className="col-md-4 mb-0 text-body-secondary">© 2024 SparkWaves, Inc</p> */}

                <Link to={'/'} className="d-inline-flex link-body-emphasis text-decoration-none">
                    {/* <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                    <p className="text-center" style={{fontFamily:'Poetsen One'}}>© 2024 SparkWaves, Inc</p>
                </Link>

                
            </footer>

            <style>{`
            .footer {
                width: 100%;
                position: fixed;
                bottom: 0;
                background-color: #fff; /* Adjust as needed */
                z-index: 1000; /* Ensure it's above other content */
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

export default Footer