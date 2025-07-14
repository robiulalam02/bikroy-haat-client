import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from '../../../API/utils';
import Spinner from '../../../Components/Loaders/Spinner';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth'

const AddAdvertisement = () => {

    const {profile} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [uploading, setUploading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [productImage, setProductImage] = useState('');

    const handleUploadPhoto = async (photo) => {
        console.log(photo)

        try {
            setImgLoading(true)
            const res = await uploadImageToImgBB(photo)
            const imageURL = res.data.data.display_url
            if (imageURL) {
                setProductImage(imageURL)
            }
        } catch {
            setImgLoading(false)
            console.log('image upload failed')
        } finally {
            setImgLoading(false)
        }
    }

    const onSubmit = async (data) => {
        console.log(data);

        const adsData = {
            ...data,
            image: productImage,
            vendorEmail: profile?.email,
        }

        try{
            const res = await axiosPublic.post('/advertisements', adsData)
            
            if (res.data.insertedId) {
                toast.success('Advertisement submit successful')
            } else{
                toast.error('Failed! Something went wrong!')
            }
        } catch (error){
            toast.error(error.message)
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Advertisement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Ad Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Ad Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter advertisement title"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea
                        rows={2}
                        {...register("description", { required: "Description is required" })}
                        placeholder="Write a short description..."
                        className="w-full border-b border-gray-300 py-2 focus:outline-none resize-none"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Advertisement Image</label>
                    {productImage && (
                        <div className="mb-2 w-24 h-24 overflow-hidden rounded shadow">
                            <img src={productImage} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleUploadPhoto(e.target.files[0])}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none file:bg-primary file:text-white file:px-4 file:py-1 file:rounded file:border-0 file:font-medium file:cursor-pointer"
                        />
                        {
                            imgLoading &&
                            <Spinner />
                        }
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-primary text-white py-3 rounded hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {uploading ? "Submitting..." : "Submit Advertisement"}
                </button>
            </form>
        </div>
    )
}

export default AddAdvertisement
