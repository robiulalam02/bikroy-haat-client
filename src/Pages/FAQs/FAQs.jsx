import React from 'react'
import FAQAccordion from '../../Components/FAQAccordion/FAQAccordion'

const FAQs = () => {
  return (
    <section className='bg-white max-w-screen-2xl mx-auto min-h-dvh my-10 rounded-2xl p-10'>
        <h2 className='text-center text-2xl mb-5 font-semibold'>Frequently Asked Questions</h2>
            <div className='flex flex-col-reverse md:flex-row gap-5'>
                {/* <div>
                    <h2 className='text-2xl font-semibold'>Send Message</h2>
                    <p className='text-gray-600 text-sm'>We’d love to hear from you! Whether you have a question about our services, need assistance, or just want to share your feedback, our team is here to help. Simply fill out the form below and we’ll get back to you as soon as possible. Your thoughts and inquiries are valuable to us, and we strive to provide you with the best support experience.</p>
                    <form className='mt-5 space-y-5' action="">
                        <div className='flex flex-col gap-1 '>
                            <label className='text-gray-600 text-sm' htmlFor="">Your Name</label>
                            <input type="text" name="name" className='bg-slate-100 h-10 px-2 placeholder:text-sm rounded focus:outline-1 outline-primary' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-600 text-sm' htmlFor="">Your Email</label>
                            <input type="email" name="email" className='bg-slate-100 h-10 px-2 placeholder:text-sm rounded focus:outline-1 outline-primary' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-600 text-sm' htmlFor="">Message</label>
                            <textarea name="message" id="" cols="30" rows="10" className='bg-slate-100 p-2 rounded focus:outline-1 outline-primary '></textarea>
                        </div>
                    <button type='submit' className='btn btn-primary text-primary bg-transparent border border-primary hover:bg-primary hover:text-white transition ease-in-out'>Send Message</button>
                    </form>
                </div> */}
                <div className='flex-1/2'>
                    <FAQAccordion />
                </div>
                <div className='flex-1/2'>                    
                    <img src="faq.jpg" alt="contact us" className='' />
                </div>
            </div>
        </section>
  )
}

export default FAQs
