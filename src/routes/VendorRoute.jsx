import { Navigate } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../Components/Loaders/Loading";


const VendorRoute = ({ children }) => {

    const { isVendor, isLoading } = useUserRole();

    if (isLoading) {
        return <Loading />;
    }

    if (!isVendor) {
        return <Navigate to="/unauthorized" replace />;
    }


    return children;
};

export default VendorRoute;
