import React from 'react'
import Logo from '../Components/Logo/Logo'
import signUpImg from '../assets/sign-up.jpeg'
import { TfiClose } from 'react-icons/tfi'
import { Outlet, useNavigate } from 'react-router'

const Authentication = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center'>
      <div className='w-7/12 flex flex-col justify-between h-full p-4'>
        <Logo />
        <Outlet />
      </div>
      <div className='w-5/12 overflow-hidden h-screen'>
        <button onClick={()=> navigate('/')} className='absolute right-5 top-5 rounded hover:bg-primary p-1 transition'>
          <TfiClose className='text-white text-xl' />
        </button>
        <img className='h-full w-full object-cover' src={signUpImg} alt="" />
      </div>
    </div>
  )
}

export default Authentication
