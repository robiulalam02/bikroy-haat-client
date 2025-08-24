import React from 'react'
import { Link } from 'react-router'

const PrivacyPolicy = () => {
    return (
        <section className='bg-white max-w-screen-2xl mx-auto min-h-dvh my-10 rounded-2xl p-10'>
            {/* <h2 className='text-center text-2xl mb-5 font-semibold'>Frequently Asked Questions</h2> */}
            <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-5'>
                    <div>
                        <h1 className='text-4xl mb-2 font-semibold'>Privacy Policy - Bikroy Haat</h1>
                        <p>At Bikroy Haat, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.</p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>1. Information We Collect</h2>
                        <p>
                            When you use Bikroy Haat, we may collect the following information:

                            <li>Account Information: Name, email address, phone number, and password.</li>

                            <li>Location Information: Your city/region to show you relevant market prices.</li>

                            <li>Transaction Data: Details of your purchases made via Stripe payment.</li>

                            <li>Reviews & Comments: Feedback, ratings, or comments you submit.</li>

                            <li>Usage Data: Information on how you use our platform to improve services.</li>
                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:

                            <li>Provide and improve our services.</li>

                            <li>Show you the latest and most accurate product prices.</li>

                            <li>Process secure payments through Stripe.</li>

                            <li>Manage your account and Watchlist.</li>

                            <li>Display reviews and ratings to other users.</li>

                            <li>Ensure a safe and reliable marketplace for all.</li>
                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>3. Sharing Your Information</h2>
                        <p>
                            We do not sell or rent your personal data to third parties.
                            However, we may share limited data in the following cases:

                            <li>With Vendors: To confirm your purchases and orders.</li>

                            <li>With Vendors: To confirm your purchases and orders.</li>

                            <li>For Legal Reasons: If required by law or to protect against fraud and abuse.</li>

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>4. Data Security</h2>
                        <p>
                            We use industry-standard measures to protect your data. All payments are processed securely via Stripe. While we work hard to safeguard your information, no system is completely secure, and we cannot guarantee 100% protection.

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>5. Payments</h2>
                        <p>
                            <li>All payments are processed securely through Stripe.</li>

                            <li>Once a payment is made, it is subject to the vendor’s refund and cancellation policy.</li>

                            <li>Bikroy Haat is not responsible for failed transactions caused by incorrect payment details.</li>

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>6. Limitation of Liability</h2>
                        <p>
                            <li>Bikroy Haat acts as a marketplace platform connecting vendors and buyers.</li>

                            <li>We are not responsible for the quality, safety, or legality of the products sold by vendors.</li>

                            <li>We are not liable for any direct, indirect, or incidental damages caused by using our services.</li>

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>7. Privacy</h2>
                        <p>
                            Your use of Bikroy Haat is also governed by our Privacy Policy, which explains how we handle your personal data.

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>8. Termination</h2>
                        <p>
                            We may suspend or terminate your access to Bikroy Haat if you violate these terms or misuse the platform.

                        </p>
                    </div>
                    <div>
                        <h2 className='text-2xl mb-2 font-semibold'>9. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms & Conditions, you can contact us at: info@bikroyhaat.com or <Link className='text-blue-500 underline hover:text-blue-700' to="/contact-us">Contact page</Link>

                        </p>
                    </div>
                </div>
                <div>
                    <img src="privacy-policy.jpg" alt="contact us" className='' />
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy
