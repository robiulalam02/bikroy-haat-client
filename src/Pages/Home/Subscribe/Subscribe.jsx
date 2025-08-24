import React, { useEffect, useState } from 'react'
import { GoMail } from "react-icons/go";
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from "framer-motion";

const Subscribe = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const handleSubscribe = (e) => {
        e.preventDefault()
        setShowSuccess(true)
        e.target.reset();
    }
    useEffect(() => {
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000)
    }, [showSuccess])
    return (
        <section className='min-h-96 md:h-[440px] lg:h-[600px] bg-[#d5f1e5] relative'>
            <div className='bg-[url(grocery-bg.png)] bg-no-repeat bg-contain bg-bottom-left absolute inset-0 h-full'>
                {/* <img src="grocery-bg.png" className='h-full absolute inset-0' alt="" /> */}
                <div className='w-full lg:w-8/12 flex flex-col justify-start md:justify-center items-center gap-5 h-full pl-0 md:pl-20 inset-1 absolute max-w-screen-2xl mx-auto text-center md:text-start px-4'>
                    <h1 className='text-xl sm:text-2xl md:text-4xl 2xl:text-5xl font-extrabold text-center mt-5 md:mt-0'>Track real-time market prices & shop smart every day</h1>
                    <p className='text-sm md:text-base'>Start Your Daily Shopping with Bikroy Haat</p>
                    <form className='' onSubmit={handleSubscribe}>
                        <div className='bg-white w-70 md:w-96 h-12 md:h-16 rounded-full relative flex items-center gap-2 pl-5'>
                            <span className='text-xl text-primary'><GoMail /></span>
                            <input type="text" name="email" required className='h-10 outline-0 placeholder:text-primary text-primary' placeholder='your email' />
                            <button type='submit' className='bg-primary text-white h-12 w-24 md:h-16 md:w-36 rounded-full absolute text-base right-0 md:text-lg font-medium'>Subscribe</button>
                        </div>
                    </form>
                    <AnimatePresence>
                        {
                            showSuccess &&
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                id="toast-simple" class="flex absolute bottom-10 items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm  dark:divide-gray-700 " role="alert">
                                <svg class="w-5 h-5 rotate-45 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
                                </svg>
                                <div class="ps-4 text-sm font-normal">Message sent successfully.</div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default Subscribe
