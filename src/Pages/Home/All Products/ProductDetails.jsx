import React, { useState } from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth'


const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { proflile } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: product = [], isLoading: productLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: reviews = [], isLoading: reviewLoading, refetch: reviewRefetch } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews?productId=${id}`);
      return res.data;
    },
    enabled: !!id
  });

  console.log(reviews)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    if (rating === 0) {
      setError("rating", { type: "manual", message: "Please select a rating" });
      return;
    }

    const reviewData = {
      name: data.name,
      review: data.review,
      rating,
      productId: product?._id,
      image: proflile?.photoURL
    };

    console.log(reviewData)

    // send post req to save review in DB
    try {
      const res = await axiosSecure.post('/reviews', reviewData)
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Revide Submitted, Thanks For Your Feedback!",
          showConfirmButton: false,
          timer: 1500
        });
        reset();
        reviewRefetch();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className=' bg-white mt-10 flex justify-between gap-5 p-4'>
        <div className='w-6/12 overflow-hidden h-96'>
          <img className='w-full object-cover' src={product?.image} alt="" />
        </div>
        <div className='w-6/12 h-full'>

          <div className='pb-3 border-b border-gray-200 space-y-1.5'>
            <h2 className='font-semibold text-xl'>{product?.itemName}</h2>
            <p className='ext-gray-600'>{product?.itemDescription}</p>
          </div>

          {/* ----- */}

          <div className='pb-3 border-b border-gray-200 space-y-1.5 mt-3'>
            <h2 className='font-semibold text-lg'>Market: <span className='font-medium'>{product?.marketName}</span></h2>
            <p className='ext-gray-600'>{product?.marketDescription}</p>
          </div>

          {/* ----- */}

          <div className='pb-3 border-b border-gray-200 mt-3'>
            <div className='w-[80%] flex items-center justify-between'>
              <div>
                <div className='flex items-center justify-between'>
                  <p>Date:</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Vendor:</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Vendor Email:</p>
                </div>
              </div>

              <div>
                <p className='text-gray-600'>{product?.date}</p>
                <p className='text-gray-600'>{product?.vendorEmail}</p>
                <p className='text-gray-600'>{product?.vendorEmail}</p>
              </div>
            </div>
          </div>

          {/* ----- */}

          <div className='pb-3 border-b border-gray-200 mt-3 space-y-1.5'>
            <p>per unit price:</p>
            <h3 className='font-medium text-xl'><span className='text-green-600 font-semibold'>{product?.pricePerUnit}৳</span> /KG</h3>
          </div>

          {/* ----- */}

          <div className='mt-3 '>

            <div className='space-y-1.5'>
              <p>Qty:</p>
              <div className='flex items-center gap-5'>
                <div className="flex items-center space-x-2">
                  {/* Minus Button */}
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <span className="min-w-[32px] text-center">{quantity}</span>

                  {/* Plus Button */}
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                  >
                    +
                  </button>
                </div>
                <button class="inline-flex items-center justify-center gap-1 border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-primary hover:bg-primary/90 border-base-200 text-stone-50 rounded-lg transition antialiased">
                  <HiOutlineShoppingBag className='text-lg' />
                  Buy Product
                </button>
              </div>
              <button className='flex items-center gap-1 hover:text-primary transition duration-300'><IoIosHeartEmpty /> Add to wishlist</button>
            </div>

          </div>

        </div>

      </div>

      {/* Review Section */}

      <div className='bg-white p-4 my-10 min-h-screen'>

        <h2 className='text-primary text-lg text-center uppercase font-medium'>User Reviews</h2>

        <div className='grid grid-cols-1 gap-4'>
          {
            reviews?.map(review => (
              <div class="py-8 text-left border border-gray-200 px-4 m-2">
                <div class="flex items-start">
                  <img class="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle" src={review.image} alt="" />

                  <div class="ml-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`h-5 w-5 ${index < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p class="mt-5 text-base text-gray-900">{review.review}</p>
                    <p class="mt-5 text-sm font-bold text-gray-900">{review.name}</p>
                    <p class="mt-1 text-sm text-gray-600">{review.createdAt}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className='mt-10'>
          <h2 className='text-primary text-lg text-center uppercase font-medium'>Share Your Feedback</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 shadow-md rounded-xl space-y-4 mt-2"
          >
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={starValue}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <FaStar
                        size={24}
                        className={`cursor-pointer transition-colors ${(hover || rating) >= starValue
                          ? "text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                // value={name}
                required
                // onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Review Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                // value={review}
                required
                // onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none  focus:border-primary"
                placeholder="Write a short review..."
                {...register("review", { required: "Review is required" })}
              />
              {errors.review && (
                <p className="text-sm text-red-500 mt-1">{errors.review.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 border border-base-200 shadow text-white font-medium py-2 px-4 rounded-md transition"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
