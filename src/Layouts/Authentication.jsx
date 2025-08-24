import React from 'react'
import Logo from '../Components/Logo/Logo'
import signUpImg from '../assets/sign-up.jpeg'
import { TfiClose } from 'react-icons/tfi'
import { Outlet, useNavigate } from 'react-router'
import AdminCredetialsToast from '../Components/Toasts/AdminCredetialsToast'

const Authentication = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col-reverse md:flex-row items-center bg-white bg-center bg-cover min-h-screen'>
      <div className='w-full md:w-7/12 flex flex-col justify-between h-full p-4 absolute md:static'>
        <Logo />
        <Outlet />
      </div>
      <div className='w-full md:w-5/12 overflow-hidden h-screen hidden md:flex'>
        <button onClick={()=> navigate('/')} className='absolute right-5 top-5 rounded hover:bg-primary p-1 transition'>
          <TfiClose className='text-black text-xl' />
        </button>
        <img className='h-full w-full object-cover' src={signUpImg} alt="" />
      </div>
      
    </div>
  )
}

export default Authentication
