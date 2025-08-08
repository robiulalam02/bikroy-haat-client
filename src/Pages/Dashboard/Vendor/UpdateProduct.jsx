import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import DatePicker from "react-datepicker";
import Spinner from '../../../Components/Loaders/Spinner';
import { uploadImageToImgBB } from '../../../API/utils';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Loading from '../../../Components/Loaders/Loading';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import useUserRole from '../../../Hooks/useUserRole';

const UpdateProduct = () => {
    const { id } = useParams();
    const { profile } = useAuth();
    const [imgLoading, setImgLoading] = useState(false);
    const [productImage, setProductImage] = useState("");
    const navigate = useNavigate();
    const {isVendor, isAdmin} = useUserRole();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { isPending, isLoading, error, data: product = [] } = useQuery({
        queryKey: ['updateProduct', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    })

    // when product.image becomes available, set it in state
    useEffect(() => {
        if (product?.image) {
            setProductImage(product.image);
        }
    }, [product]);

    const handleUploadPhoto = async (photo) => {

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

    const [selectedDate, setSelectedDate] = useState(new Date());


    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split("T")[0];

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const updatedProduct = {
            ...data,
            image: productImage,

        }

        try {
            const res = await axiosSecure.put(`/products/${id}`, updatedProduct);

            if (res.data.modifiedCount) {
                toast.success("Product Updated Successfully!");
                e.target.reset();
                if (isVendor) {
                    navigate('/dashboard/my-products')
                } else{
                    navigate('/dashboard/all-products')
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isPending || isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Helmet>
                <title>Update Product</title>
            </Helmet>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-2xl bg-white p-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">Update Your Product</h2>
                    <form onSubmit={handleUpdateProduct} className="space-y-6">
                        {/* Vendor Info (Read-only) */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Vendor Email</label>
                            <input
                                name='vendorEmail'
                                value={profile?.email}
                                readOnly
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Vendor Name</label>
                            <input
                                name='vendorName'
                                value={profile?.displayName}
                                readOnly
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>

                        {/* Market Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Market Name</label>
                            <input
                                defaultValue={product?.marketName}
                                name='marketName'
                                placeholder="e.g., Karwan Bazar"
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>

                        {/* Market Description */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Market Description</label>
                            <textarea
                                defaultValue={product?.marketDescription}
                                name='marketDescription'
                                rows={2}
                                placeholder="Location, establishment info, etc."
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            ></textarea>
                        </div>

                        {/* Date Picker */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Date</label>
                            <DatePicker
                                name='date'
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>

                        {/* Item Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Item Name</label>
                            <input
                                defaultValue={product?.itemName}
                                name='itemName'
                                placeholder="e.g., Onion"
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Product Image</label>
                            {/* image preview */}
                            <div className='w-14 h-14 overflow-hidden'>
                                <img className='h-full w-full object-cover' src={productImage} alt="" />
                            </div>
                            <div className="w-full border-b border-gray-300 py-2 flex items-center gap-4">
                                <input
                                    onChange={e => handleUploadPhoto(e.target.files[0])}
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                />
                                {
                                    imgLoading &&
                                    <Spinner />
                                }
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Price Per Unit (৳)</label>
                            <input
                                type="number"
                                step="0.01"
                                defaultValue={product?.pricePerUnit}
                                name='pricePerUnit'
                                placeholder="e.g., 30"
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            />
                        </div>

                        {/* Item Description (optional) */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Item Description (optional)</label>
                            <textarea
                                defaultValue={product?.itemDescription}
                                name='itemDescription'
                                rows={2}
                                placeholder="Freshly harvested, top quality, etc."
                                className="w-full border-b border-gray-300 focus:outline-none py-2"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 rounded hover:bg-primary/90 transition"
                        >
                            Submit Product
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}


export default UpdateProduct
