import React from 'react'
import errorImg from '../../assets/page-not-found.svg'
import { Helmet } from 'react-helmet-async'

const ErrorPage = () => {
  return (
    <div className='min-h-screen bg-white flex justify-center items-center'>
      <Helmet>
        <title>404 page not found</title>
      </Helmet>
      <img src={errorImg} alt="" />
    </div>
  )
}

export default ErrorPage
