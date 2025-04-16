import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Authentication/Login";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Authentication/Register";
import Foods from "../Pages/Foods";
import Gallery from "../Pages/Gallery";
import SingleFood from "../Pages/SingleFood";
import FoodPurchasePage from "../privateRoute/FoodPurchasePage";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/foods",
        element: <Foods></Foods>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/food/:id",
        element: <SingleFood></SingleFood>,
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchasePage></FoodPurchasePage>
          </PrivateRoute>
        ),
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
]);
export default Router;
