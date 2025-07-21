import { Navigate } from "react-router";
import Loading from "../Components/Loaders/Loading";
import useUserRole from "../Hooks/useUserRole";


const AdminRoute = ({ children }) => {
    const { isAdmin, isLoading } = useUserRole();

    if (isLoading) return <Loading />;

    if (!isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;