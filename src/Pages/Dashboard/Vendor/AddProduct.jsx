import React, { useState } from 'react'
import useAuth from '../../../Hooks/useAuth'
import { useForm, useFieldArray } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImageToImgBB } from '../../../API/utils';
import Spinner from '../../../Components/Loaders/Spinner';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AddProduct = () => {

    const axiosPublic = useAxiosPublic();
    const { profile } = useAuth();
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

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const onSubmit = async (data) => {
        const today = new Date().toISOString().split("T")[0];
        const product = {
            vendorEmail: profile?.email,
            vendorName: profile?.displayName,
            marketName: data.marketName,
            date: selectedDate.toISOString().split("T")[0],
            marketDescription: data.marketDescription,
            itemName: data.itemName,
            status: "pending",
            image: productImage, // handle imgbb upload separately
            pricePerUnit: data.pricePerUnit,
            prices: [{ date: today, price: parseFloat(data.pricePerUnit) }],
            itemDescription: data.itemDescription || "",
        };

        console.log("Submitted Product:", product);

        // insert product to DB
        try {
            const res = await axiosPublic.post("/products", product);

            console.log(res.data)

            if (res.data.insertedId) {
                toast.success("Product submitted successfully!");
                reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-2xl bg-white p-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Vendor Info (Read-only) */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Vendor Email</label>
                        <input
                            value={profile?.email}
                            readOnly
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Vendor Name</label>
                        <input
                            value={profile?.displayName}
                            readOnly
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        />
                    </div>

                    {/* Market Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Market Name</label>
                        <input
                            {...register("marketName", { required: true })}
                            placeholder="e.g., Karwan Bazar"
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        />
                        {errors.marketName && <p className="text-red-500 text-sm">Market name is required</p>}
                    </div>

                    {/* Market Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Market Description</label>
                        <textarea
                            {...register("marketDescription", { required: true })}
                            rows={2}
                            placeholder="Location, establishment info, etc."
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        ></textarea>
                        {errors.marketDescription && <p className="text-red-500 text-sm">Description is required</p>}
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Date</label>
                        <DatePicker
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
                            {...register("itemName", { required: true })}
                            placeholder="e.g., Onion"
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Product Image</label>
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
                            {...register("pricePerUnit", { required: true })}
                            placeholder="e.g., 30"
                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                        />
                    </div>

                    {/* Item Description (optional) */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Item Description (optional)</label>
                        <textarea
                            {...register("itemDescription")}
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
    )
}

export default AddProduct
