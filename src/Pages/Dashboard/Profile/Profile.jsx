import React, { useState } from 'react'
import useAuth from '../../../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loaders/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { uploadImageToImgBB } from '../../../API/utils';
import Spinner from '../../../Components/Loaders/Spinner';
import ImageLoader from '../../../Components/Loaders/ImageLoader';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { profile, updateUserProfile } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleUploadPhoto = async (photo) => {

        try {
            setImgLoading(true)
            const res = await uploadImageToImgBB(photo)
            const imageURL = res.data.data.display_url
            if (imageURL) {
                const name = profile?.displayName;
                const profilePhoto = imageURL
                try {
                    updateUserProfile(name, profilePhoto)
                    const res = await axiosSecure.patch(`/user/${user?._id}`, { profilePhoto });

                    if (res.data.modifiedCount) {
                        toast.success('profile picture successfully updated')
                    }
                } catch (error) {
                    toast.error('error uploading profile photo!')
                }
            }
        } catch {
            setImgLoading(false)
            console.log('image upload failed')
        } finally {
            setImgLoading(false)
        }
    }

    const {
        isPending,
        isLoading,
        isError,
        error,
        data: user,
        refetch
    } = useQuery({
        queryKey: ['userData', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${profile?.email}`);
            return res.data;
        },
        enabled: !!profile?.email
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, phone, location } = data;
        try {
            updateUserProfile(name)
            const res = await axiosSecure.patch(`/user/${user?._id}`, data);

            if (res.data.modifiedCount) {
                toast.success('profile update successful')
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    if (isLoading, isPending) {
        return <Loading />
    };

    return (
        <div className='h-full'>
            <Helmet>
                <title>Dashboard | Profile</title>
            </Helmet>
            <div className="w-full bg-white p-10 font-normal leading-relaxed text-gray-900 h-full">
                <h2 className="mb-5 text-4xl font-bold">My Profile</h2>
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between mb-5 items-start">

                        <div className="text-center">
                            <div>
                                <img src={profile?.photoURL} alt="Profile Picture" className="rounded-full w-32 h-32 mx-auto border-4 border-primary mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300" />
                                <input type="file" name="profile" id="upload_profile" hidden onChange={e => handleUploadPhoto(e.target.files[0])} />

                                <label htmlFor="upload_profile" className="inline-flex items-center">
                                    {
                                        imgLoading ?
                                            <ImageLoader />
                                            :
                                            <svg data-slot="icon" className="w-5 h-5 text-primary" fill="none" strokeWidth="1.5"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                                </path>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                                </path>
                                            </svg>
                                    }
                                </label>
                            </div>

                        </div>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label for="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" readOnly={!showForm} defaultValue={profile?.displayName} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <label for="title" className="block text-sm font-medium text-gray-700">Role</label>
                            <input type="text" id="title" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" readOnly value={user?.role} />
                        </div>

                        <div>
                            <label for="organization" className="block text-sm font-medium text-gray-700">Joined on</label>
                            <input type="text" id="organization" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={new Date(user?.createdAt).toLocaleDateString()} />
                        </div>

                        <div>
                            <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" readOnly defaultValue={profile?.email}
                            />
                        </div>
                        <div>
                            <label for="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" readOnly={!showForm} id="phone" defaultValue={user?.phone} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                {...register("phone")}
                            />
                        </div>
                        <div>
                            <label for="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" readOnly={!showForm} id="location" defaultValue={user?.location} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                {...register("location")}
                            />
                        </div>

                        {
                            showForm ?
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => setShowForm(false)} type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Changes</button>
                                </div>
                                :
                                <div className="flex justify-end">
                                    <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300">
                                        Update Profile
                                    </button>
                                </div>
                        }
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Profile
