import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UserAuth";

const RequiredAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.userName ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
