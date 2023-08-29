
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />

    );
};

export default AuthRoute;