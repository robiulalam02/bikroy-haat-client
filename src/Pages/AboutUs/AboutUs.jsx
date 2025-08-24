import React from 'react'

const AboutUs = () => {
    return (
        <section className='bg-white max-w-screen-2xl mx-auto min-h-dvh my-10 rounded-2xl p-10'>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    <div className='flex flex-col gap-3 text-lg text-gray-700'>
                        <p>Welcome to Bikroy Haat your trusted place to track and explore daily market prices & shop daily needs from our trusted vendors.</p>
                        <p>We believe that everyone deserves clear, fair, and updated price information before they buy anything from the local market. That’s why Bikroy Haat connects vendors and buyers in one platform, where vendors can share daily prices, and buyers can compare, review, and even purchase products securely through Stripe payment.</p>
                        <p>Our platform is not just about numbers — it’s about helping families, small businesses, and communities make better shopping decisions. With features like watchlists, price comparisons, and real user reviews, we make sure you always stay ahead of market changes.</p>
                        <p>At Bikroy Haat, we aim to make the daily bazar experience smarter, easier, and more transparent for everyone.</p>
                    </div>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className='flex gap-3'>
                            <div>
                                <img src="bar-chart.png" className='w-10' alt="" />
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold'>Compare Price</h3>
                                <p className=''>Our data comparison & charts help you understand market trends at a glance.</p>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div>
                                <img src="24-7.png" className='w-10' alt="" />
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold'>Customer Support</h3>
                                <p className=''>Our friendly and knowledgeable customer support team is available to assist you with any inquiries or concerns.</p>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div>
                                <img src="fast-delivery.png" className='w-10' alt="" />
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold'>Fast and Reliable Delivery</h3>
                                <p className=''>We ensure your order reaches your doorstep promptly and in pristine condition.</p>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div>
                                <img src="credit-card.png" className='w-10' alt="" />
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold'>Secure Payment</h3>
                                <p className=''>Make your payment internationally & securely with 15+ currency & method methods.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="about-us.svg" alt="" />
                </div>
            </div>
        </section>
    )
}

export default AboutUs
