import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    const { profile: user, loading } = useAuth(); // get logged-in user

    const { data: roleData = {}, isLoading, error, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        },
    });

    const role = roleData?.role;
    const isAdmin = role === 'admin';
    const isVendor = role === 'vendor';
    const isUser = role === 'user';

    return { isVendor, isUser, isAdmin, isLoading: isLoading || loading, error, refetch };
};

export default useUserRole;