import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateAdModal from '../../../Components/Modals/UpdateAdModal';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loaders/Loading';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const MyAdvertisements = () => {
    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { isPending, isLoading, refetch, error, data: myAds = [] } = useQuery({
        queryKey: ['myAds', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertisements?email=${profile?.email}`);
            return res.data;
        }
    })

    if (isLoading || isPending) {
        return <Loading />
    }

    const openUpdateModal = (ad) => {
        setSelectedAd(ad);
        setIsOpen(true);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await axiosPublic.put(`/advertisements/${selectedAd?._id}`, data);

            console.log(res.data)

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
    }

    const handleDeleteAd = async (id) => {
        console.log(id);

        // send delete req to server
        try {
            const res = await axiosSecure.delete(`/vendor/advertisements/${id}`);

            console.log(res.data)

            if (res.data.success) {
                toast.success("Ad Deleted Successfully!");
                refetch();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-6">
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
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-center">Posted At</th>
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
                                        <td className="px-4 py-3">{ad.description}</td>
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
                                                    onClick={() => handleDeleteAd(ad._id)}
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
                        <button onClick={()=> navigate('/dashboard/add-advertisements')} className='btn btn-primary text-white'>Click to Add</button>
                    </div>
            }
        </div>

    )
}

export default MyAdvertisements
