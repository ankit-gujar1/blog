import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Signup from '../src/components/Signup'
import Login from './components/Login';
import { AddTest } from './components/AddTest';
import Home from './components/admin/Home';
import AddBlog from './components/AddBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
  {path:'/signup',element:<Signup/>},
  {path:'/',element:<App/>},
  {path:'/login',element:<Login/>},
  {path:'/add',element:<AddTest/>},
  {path:'/post-blog',element:<AddBlog/>},

  //admin
  {path:'/admin/home',element:<Home/>}
])
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

