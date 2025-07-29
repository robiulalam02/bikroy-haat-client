import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth'
import PriceComparisonChart from '../../../Components/Comparison/PriceComparisonChart';
import Reviews from '../../../Components/Reviews/Reviews';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loaders/Loading';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';


const ProductDetails = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showMoreOrLess, setShowMoreOrLess] = useState(true);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: product = [], isLoading: productLoading, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const totalPrice = parseFloat(product?.pricePerUnit || 0) * quantity;

  const { data: reviews = [], isLoading: reviewLoading, refetch: reviewRefetch } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews?productId=${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // Determine which reviews to display
  const reviewsData = showAllReviews ? reviews : reviews?.slice(0, 2);

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
      image: profile?.photoURL
    };

    // send post req to save review in DB
    try {
      const res = await axiosSecure.post('/reviews', reviewData)

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

  const handleBuyNow = (id) => {
    navigate(`/payment/${id}`, {
      state: {
        totalPrice,
        quantity
      },
    });
  };

  const handleWatchlist = async () => {
    const { _id, ...productData } = product;
    const data = {
      ...productData,
      productId: product._id,
      user: profile?.email
    }

    // post req to save watchlist in DB
    try {
      const res = await axiosSecure.post('/watchlist', data)
      if (res.data.insertedId) {
        toast.success('product added to watchlist')
      } else {
        toast.error('something went wrong while adding product to watchlist')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  if (productLoading) {
    return <Loading />
  }

  if (isError || error) {
    return <ErrorMessage />
  }

  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className=' bg-white md:mt-10 flex flex-col md:flex-row justify-between gap-5 p-4'>
        <div className='w-full md:w-6/12 overflow-hidden h-96 flex justify-center items-center'>
          <img className='w-[300px] md:w-80 object-cover' src={product?.image} alt="" />
        </div>
        <div className='w-full md:w-6/12 h-full'>

          <div className='pb-3 border-b border-gray-200 space-y-1.5'>
            <h2 className='font-semibold text-xl'>{product?.itemName}</h2>
            <p className='ext-gray-600'>{product?.itemDescription}</p>
          </div>

          {/* ----- */}

          <div className='pb-3 border-b border-gray-200 space-y-1.5 mt-3'>
            <h2 className='font-semibold text-lg'>Market: <span className='font-medium'>{product?.marketName}</span></h2>
            <p className='ext-gray-600'>{showMoreOrLess ? product?.marketDescription.slice(0, 200) : product?.marketDescription}</p>
            {
              product?.marketDescription?.length >= 200 &&
              <button onClick={() => setShowMoreOrLess(!showMoreOrLess)} className='text-sm text-primary hover:text-primary/90'>
                {
                  showMoreOrLess ?
                    'show more' :
                    'show less'
                }
              </button>
            }
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
                <button onClick={() => handleBuyNow(product._id)} className="inline-flex items-center justify-center gap-1 border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-primary hover:bg-primary/90 border-base-200 text-stone-50 rounded-lg transition antialiased">
                  <HiOutlineShoppingBag className='text-lg' />
                  Buy Product
                </button>
              </div>
              <button onClick={handleWatchlist} className='flex items-center gap-1 hover:text-primary transition duration-300'><IoIosHeartEmpty /> Add to watchlist</button>
            </div>

          </div>

        </div>

      </div>

      {/* comparison */}
      <div className='bg-white p-4 md:my-10 py-10'>
        <PriceComparisonChart product={product} />
      </div>

      {/* Review Section */}

      {
        reviewLoading ?
          <Loading />
          :
          <div className='bg-white px-4 py-10 md:py-4 md:my-10 min-h-screen'>

            <h2 className='text-primary text-xl text-center uppercase font-semibold '>User Reviews</h2>

            {
              reviews?.length > 0 ?
                reviewLoading ?
                  <Loading />
                  :
                  <Reviews setShowAllReviews={setShowAllReviews} showAllReviews={showAllReviews} reviewsData={reviewsData} />
                :
                <div className='h-40 flex justify-center items-center'>
                  <p className='text-error text-center'>currently there are no reviews available for this product</p>
                </div>
            }

            <div className='mt-10'>
              <h2 className='text-primary text-xl text-center uppercase font-semibold'>Share Your Feedback</h2>
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
      }

    </div>
  )
}

export default ProductDetails
