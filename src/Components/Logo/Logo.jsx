import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router'

const Logo = () => {
  const navigate = useNavigate();
  return (
    <button onClick={()=> navigate('/')} className='flex items-center gap-1'>
      <img className='w-10' src={logo} alt="" />
      <p className='text-3xl uppercase font-gliker text-primary'>bikroy haat</p>
    </button>
  )
}

export default Logo
