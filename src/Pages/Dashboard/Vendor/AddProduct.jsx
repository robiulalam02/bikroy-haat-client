import React, { useState } from 'react'
import useAuth from '../../../Hooks/useAuth'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImageToImgBB } from '../../../API/utils';
import Spinner from '../../../Components/Loaders/Spinner';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AddProduct = () => {

    const axiosSecure = useAxiosSecure();
    const { profile } = useAuth();
    const [imgLoading, setImgLoading] = useState(false);
    const [productImage, setProductImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            prices: [
                { date: '', price: '' },
                { date: '', price: '' },
                { date: '', price: '' }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'prices',
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    const onSubmit = async (data) => {
        if (!productImage) {
            return toast.error('please upload a product Image')
        }
        const product = {
            vendorEmail: profile?.email,
            vendorName: profile?.displayName,
            marketName: data.marketName,
            date: selectedDate.toISOString().split("T")[0],
            marketDescription: data.marketDescription,
            itemName: data.itemName,
            status: "pending",
            image: productImage,
            pricePerUnit: data.pricePerUnit,
            prices: data.prices.map(p => ({
                date: p.date,
                price: parseFloat(p.price)
            })),
            itemDescription: data.itemDescription || "",
        };

        try {
            setIsLoading(true);
            const res = await axiosSecure.post("/products", product);
            if (res.data.insertedId) {
                toast.success("Product submitted successfully!");
                reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-12">
            <Helmet>
                <title>Add Product</title>
            </Helmet>
            <div className="mx-auto w-full max-w-2xl bg-white p-10">
                <h2 className="text-2xl font-extrabold mb-6 text-center">Add New Product</h2>
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
                        {errors.itemName && <p className="text-red-500 text-sm">Item name is required</p>}
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
                        {errors.pricePerUnit && <p className="text-red-500 text-sm">require product price per unit</p>}
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

                    <div>
                        <label className="block mb-2 text-sm font-medium">Previous Prices (At least 3 entries)</label>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border border-gray-200 p-4 rounded-lg"
                                >
                                    {/* Date Picker Field */}
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Date</label>
                                        <Controller
                                            control={control}
                                            name={`prices.${index}.date`}
                                            // Add validation rule: required
                                            rules={{ required: "Date is required" }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    selected={field.value ? new Date(field.value) : null}
                                                    // Ensure date is stored as YYYY-MM-DD string for consistency
                                                    onChange={(date) => field.onChange(date?.toISOString().split('T')[0] || null)}
                                                    dateFormat="yyyy-MM-dd"
                                                    placeholderText="Select date"
                                                    className={`w-full border-b py-2 focus:outline-none ${errors.prices?.[index]?.date ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />
                                            )}
                                        />
                                        {/* Display error message for date */}
                                        {errors.prices?.[index]?.date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.prices[index].date.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Price Field */}
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Price (৳)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 35"
                                            // Add validation rules: required and minimum value
                                            {...register(`prices.${index}.price`, {
                                                required: "Price is required",
                                                min: {
                                                    value: 0.01,
                                                    message: "Price must be greater than 0"
                                                }
                                            })}
                                            className={`w-full border-b py-2 focus:outline-none ${errors.prices?.[index]?.price ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {/* Display error message for price */}
                                        {errors.prices?.[index]?.price && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.prices[index].price.message}
                                            </p>
                                        )}
                                    </div>

                                    {index > 2 && (
                                        <div className="sm:col-span-2 text-right">
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 text-sm hover:underline"
                                            >
                                                Remove Entry
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* General error message for minimum entries */}
                        {errors.prices && fields.length < 3 && (
                            <p className="text-red-500 text-sm mt-2">
                                Please add at least 3 previous price entries.
                            </p>
                        )}

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => append({ date: '', price: '' })}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                + Add Another Price Entry
                            </button>
                        </div>
                    </div>



                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded hover:bg-primary/90 transition"
                    >
                        {
                            isLoading ?
                                <Spinner />
                                :
                                'Submit Product'
                        }
                    </button>
                </form>

            </div>
        </div>
    )
}

export default AddProduct
