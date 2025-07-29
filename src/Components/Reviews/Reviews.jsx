import React, { useState } from 'react'
import Loading from '../../Components/Loaders/Loading'

const Reviews = ({ reviewsData, setShowAllReviews, showAllReviews }) => {
    if (!reviewsData) {
        return <Loading />
    }
    return (
        <div>
            <div className='grid grid-cols-1 gap-4'>
                {
                    reviewsData?.map(review => (
                        <div className="py-8 text-left border border-gray-200 px-4 m-2">
                            <div className="flex items-start">
                                <img className="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle" src={review.image} alt="" />

                                <div className="ml-6">
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
                                    <p className="mt-5 text-base text-gray-900">{review.review}</p>
                                    <p className="mt-5 text-sm font-bold text-gray-900">{review.name}</p>
                                    <p className="mt-1 text-sm text-gray-600">{review.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Show "All Reviews" button only if there are more than 2 reviews and not all are currently shown */} 
            {!showAllReviews && reviewsData?.length >= 2 && (
                <div className="flex justify-center">
                    <button onClick={() => setShowAllReviews(true)} className="group mt-5 relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-primary py-1 pl-6 pr-14 font-medium hover:text-primary text-base-100">
                        <span className="z-10 pr-2">Show All</span>
                        <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-base-200 transition-[width] group-hover:w-[calc(100%-8px)]">
                            <div className="mr-3.5 flex items-center justify-center"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </button>
                </div>
            )}

            {/* Optionally, show "Show Less" button if all reviews are currently shown and there are more than 2 */}
            {showAllReviews && reviewsData?.length > 2 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAllReviews(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out"
                    >
                        Show Less
                    </button>
                </div>
            )}
        </div>
    )
}

export default Reviews
