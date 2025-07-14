import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const axiosSecure = useAxiosSecure();

  const { data: product = [], isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    }
  });

  console.log(product)

  return (
    <div className='max-w-screen-lg mx-auto bg-white mt-10 flex justify-between gap-5 p-4'>
      <div className='w-6/12 overflow-hidden'>
        <img className='w-full object-cover' src={product?.image} alt="" />
      </div>
      <div className='w-6/12 h-full'>

        <div className='pb-3 border-b border-gray-200 space-y-1.5'>
          <h2 className='font-semibold text-xl'>{product?.itemName}</h2>
          <p className='ext-gray-600'>{product?.itemDescription}</p>
        </div>

        <div className='pb-3 border-b border-gray-200 space-y-1.5 mt-3'>
          <h2 className='font-semibold text-lg'>Market: <span className='font-medium'>{product?.marketName}</span></h2>
          <p className='ext-gray-600'>{product?.marketDescription}</p>
        </div>

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

        <div className='pb-3 border-b border-gray-200 mt-3 space-y-1.5'>
            <p>per unit price:</p>
            <h3 className='font-medium text-xl'><span className='text-green-600 font-semibold'>{product?.pricePerUnit}৳</span> /KG</h3>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails
