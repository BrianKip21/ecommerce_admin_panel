import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";

export default function RequireAdmin() {
    const { admin, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!admin) return <Navigate to="/login" replace />;

    return <Outlet />;
}
