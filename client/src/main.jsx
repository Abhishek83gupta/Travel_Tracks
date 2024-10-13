import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Home/Home.jsx';
import ProtectedRoute from './pages/Auth/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-day-picker/style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
       path: "/dashboard",
       element: <Home/>
       
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
     <ToastContainer/>
  </StrictMode>,
)
