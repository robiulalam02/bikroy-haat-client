import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { MdCheckCircleOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';


const AllAdvertisements = () => {
    const { profile } = useAuth(); // Assuming profile contains user role/email
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch All Advertisements
    const {
        isPending,
        isLoading,
        isError,
        error,
        data: advertisements = [],
        refetch
    } = useQuery({
        queryKey: ['allAdvertisements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allAds');
            return res.data;
        },
        // enabled: !!profile?.isAdmin
    });

    console.log(advertisements);

    // Mutation for updating advertisement status (Approve)
    const updateAdvertisementStatusMutation = useMutation({
        mutationFn: async ({ advertisementId, status }) => {
            const res = await axiosSecure.patch(`/advertisements/${advertisementId}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allAdvertisements']);
            toast.success('Advertisement status has been successfully updated.')
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to update advertisement status. Please try again.')
        },
    });

    // Handler for Approve button
    const handleApproveAdvertisement = (advertisementId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to approve this advertisement!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Green for Approve
            cancelButtonColor: '#6B7280', // Neutral gray for Cancel
            confirmButtonText: 'Yes, Approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateAdvertisementStatusMutation.mutate({ advertisementId, status: 'approved' });
            }
        });
    };

    return (
        <div className="p-4 md:p-8 bg-white overflow-x-auto h-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                All Advertisements
            </h1>

            {advertisements.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No advertisements found.
                </p>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {advertisements.map((ad, index) => (
                                <tr key={ad._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {ad.image && (
                                            <img src={ad.image} alt={ad.title} className="w-16 h-12 object-cover rounded-md" />
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={ad.title}>{ad.title || 'N/A'}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis" title={ad.description}>{ad.description || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{ad.vendorEmail || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm capitalize">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                          ${ad.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                ad.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {ad.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className='flex items-center gap-2'>
                                            {ad.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleApproveAdvertisement(ad._id)}
                                                    className="flex items-center gap-1 px-4 py-2 bg-base-200 text-green-600 rounded-full shadow-md transition duration-200"
                                                >
                                                    approve <MdCheckCircleOutline size={18} />
                                                </button>
                                            )}
                                            <button
                                                // onClick={() => handleDeleteAdvertisement(ad._id)}
                                                className="p-3 rounded-2xl shadow-md bg-base-200 text-red-500  transition duration-200 ml-2"
                                                title="Delete Advertisement"
                                            >
                                                <AiOutlineDelete className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AllAdvertisements
