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
import MyBlogs from './components/MyBlogs';
import PopularBlogs from './components/PopularBlogs';
import EditBlog from './components/EditBlog';
import ViewBlog from './components/ViewBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
  {path:'/signup',element:<Signup/>},
  {path:'/',element:<App/>},
  {path:'/login',element:<Login/>},
  {path:'/add',element:<AddTest/>},
  {path:'/post-blog',element:<AddBlog/>},
  {path:'/my-blogs',element:<MyBlogs/>},
  {path:'/popular-blogs',element:<PopularBlogs/>},
  {path:'/edit-blog/:id',element:<EditBlog/>},
  {path:'/view-blog/:id',element:<ViewBlog/>},

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

