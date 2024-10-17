import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Home/Home.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-day-picker/style.css";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute children={<Home/>} requireAuth={true}/>
      },
      {
        path: "/login",
        element: <ProtectedRoute children={<Login/>} requireAuth={false}/>
      },
      {
        path: "/signup",
        element: <ProtectedRoute children={<Signup/>} requireAuth={false}/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
