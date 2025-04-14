import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from '../Layout/HomeLayout';
import HomePage from '../Pages/HomePage';
import Login from '../Authentication/Login';
import AuthLayout from '../Layout/AuthLayout';
import Register from '../Authentication/Register';



const Router = createBrowserRouter ([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/", 
                element: <HomePage></HomePage>,
            },
            
        ],
        
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          { path: "/auth/login", element: <Login /> },
          { path: "/auth/register", element: <Register></Register> },
        ],
      },
     
])
export default Router;