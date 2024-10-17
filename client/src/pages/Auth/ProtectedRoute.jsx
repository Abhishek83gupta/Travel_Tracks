import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children , requireAuth = true}) => {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  if (
    isAuthenticated &&
    (location.pathname == "/login" || location.pathname == "/signup")
  ) {
    return <Navigate to="/" />
  }


  if(!isAuthenticated && requireAuth){
    return <Navigate to="/login" />
  }

  return children
};

export default ProtectedRoute