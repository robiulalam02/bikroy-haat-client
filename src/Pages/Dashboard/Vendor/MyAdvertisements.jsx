import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateAdModal from '../../../Components/Modals/UpdateAdModal';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loaders/Loading';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { Helmet } from 'react-helmet-async';

const MyAdvertisements = () => {
    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, isLoading, refetch, error, isError, data: myAds = [] } = useQuery({
        queryKey: ['myAds', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor/advertisements?email=${profile?.email}`);
            return res.data;
        }
    });

    const openUpdateModal = (ad) => {
        setSelectedAd(ad);
        setIsOpen(true);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await axiosSecure.put(`/advertisements/${selectedAd?._id}`, data);

            if (res.data.modifiedCount) {
                toast.success("Ad Updated Successfully!");
                refetch();
                setIsOpen(false)
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error)
        }
    };

    // Mutation for deleting a product
    const deleteAdsMutation = useMutation({
        mutationFn: async (advertisementId) => {
            const res = await axiosSecure.delete(`/advertisements/${advertisementId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myAds'] }); // Refetch all products
            toast.success('Advertisement deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting Advertisement:', error);
            toast.error(error.response?.data?.message || 'Failed to delete Advertisement.');
        }
    });

    // Handler for Delete button
    const handleDeleteAdvertisement = (advertisementId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to delete this advertisement!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red', // Green for Approve
            cancelButtonColor: '#6B7280', // Neutral gray for Cancel
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAdsMutation.mutate(advertisementId);
            }
        });
    };

    if (isLoading || isPending) {
        return <Loading />
    };

    if (isError || error) {
        return <ErrorMessage />
    }

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <Helmet>
                <title>My Advertisements</title>
            </Helmet>
            <UpdateAdModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                adData={selectedAd}
                onUpdate={handleUpdate}
            />
            <h2 className="text-2xl font-extrabold text-center mb-6">My Advertisements</h2>
            {
                myAds?.length > 0 ?
                    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="border-b bord text-gray-700 uppercas">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Description</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-2 py-3 text-center">Posted At</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y divide-gray-200">
                                {myAds?.map((ad, index) => (
                                    <tr key={ad._id} className="hover:bg-primary/30 transition">
                                        <td className="px-4 py-3 font-medium">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={ad.image}
                                                alt={ad.title}
                                                className="w-16 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-semibold">{ad.title}</td>
                                        <td className="px-4 py-3 hidden md:table-cell">{ad.description}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${ad.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {ad.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">
                                            {new Date(ad.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-4">
                                                {/* Update Button */}
                                                <button
                                                    onClick={() => {
                                                        openUpdateModal(ad)       // opens the modal
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 text-xs"
                                                >
                                                    <FaEdit className="text-sm" />
                                                    Update
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDeleteAdvertisement(ad._id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200 text-xs"
                                                >
                                                    <FaTrash className="text-sm" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center h-screen gap-2'>
                        <h3>You doesn't added any advertisement yet !!</h3>
                        <button onClick={() => navigate('/dashboard/add-advertisements')} className='btn btn-primary text-white'>Click to Add</button>
                    </div>
            }
        </div>

    )
}

export default MyAdvertisements
