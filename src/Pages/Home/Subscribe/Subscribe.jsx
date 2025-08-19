import React from 'react'

const Subscribe = () => {
    return (
        <section className='h-[600px] bg-[#d5f1e5] relative'>
            <img src="grocery-bg.png" className='h-[600px] absolute inset-0' alt="" />
            <div className='w-7/12 mx-auto flex flex-col justify-center gap-5 h-full pl-20 inset-1 absolute'>
                <h1 className=' text-6xl font-bold'>Track real-time market prices & shop smart every day</h1>
                <p>Start Your Daily Shopping with Bikroy Haat</p>
                <form>
                    <input type="email" name="email" className='bg-white h-16 w-sm rounded-full pl-10 pr-20 ring-0 outline-0' placeholder='your email address' />
                    <button type='submit' className='bg-primary text-white h-16 w-36 rounded-full relative right-14 text-lg font-medium'>Subscribe</button>
                </form>
            </div>
        </section>
    )
}

export default Subscribe
