import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();

    const user: IUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined;

    return (
        user?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user?.userName
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
