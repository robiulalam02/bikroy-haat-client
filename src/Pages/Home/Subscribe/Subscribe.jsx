import React from 'react'
import { GoMail } from "react-icons/go";


const Subscribe = () => {
    return (
        <section className='min-h-96 lg:h-[600px] bg-[#d5f1e5] relative'>
            <div className='bg-[url(grocery-bg.png)] bg-no-repeat bg-contain bg-bottom-left absolute inset-0 h-full'>
                {/* <img src="grocery-bg.png" className='h-full absolute inset-0' alt="" /> */}
                <div className='w-full lg:w-7/12 flex flex-col justify-start md:justify-center items-center gap-5 h-full pl-0 md:pl-20 inset-1 absolute max-w-screen-2xl mx-auto text-center md:text-start px-5 lg:px-0'>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold text-center mt-5 md:mt-0'>Track real-time market prices & shop smart every day</h1>
                    <p className='text-sm md:text-base'>Start Your Daily Shopping with Bikroy Haat</p>
                    <form className=''>
                        <div className='bg-white w-70 md:w-96 h-12 md:h-16 rounded-full relative flex items-center gap-2 pl-5'>
                            <span className='text-xl text-primary'><GoMail /></span>
                            <input type="text" name="" id="" className='h-10 outline-0 placeholder:text-primary text-primary' placeholder='your email' />
                            <button type='submit' className='bg-primary text-white h-12 w-24 md:h-16 md:w-36 rounded-full absolute text-base right-0 md:text-lg font-medium'>Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Subscribe
