import React from 'react'
import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <div className='flex items-center gap-1'>
      <img className='w-10' src={logo} alt="" />
      <p className='text-3xl uppercase font-gliker text-primary'>bikroy haat</p>
    </div>
  )
}

export default Logo
