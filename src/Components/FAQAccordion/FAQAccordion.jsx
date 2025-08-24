import React from 'react'

const FAQAccordion = () => {
    return (
        <div className="join join-vertical bg-base-100">
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title font-semibold">What is Bikroy Haat?</div>
                <div className="collapse-content text-sm">Bikroy Haat is an online platform where you can track daily prices of essential market items, compare them with previous dates, add products to your watchlist, read reviews, and even buy products directly using secure Stripe payments.</div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title font-semibold">How often are the prices updated?</div>
                <div className="collapse-content text-sm">Prices are updated by vendors regularly. Since multiple vendors can submit prices, you get the most real-time and accurate market information.</div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title font-semibold">Can I buy products directly from Bikroy Haat?</div>
                <div className="collapse-content text-sm">Yes! You can use the “Buy Product” button on the details page to pay securely through Stripe. After successful payment, your purchase is saved in the database and confirmed instantly.</div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title font-semibold">What is the Watchlist feature?</div>
                <div className="collapse-content text-sm">The Watchlist allows you to save products you’re interested in so you can easily track their price changes over time.</div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title font-semibold">How does the price comparison work?</div>
                <div className="collapse-content text-sm">You can select a previous date and compare product prices using a visual bar chart. This helps you see whether prices have gone up or down, giving you a clear view of market trends.</div>
            </div>
        </div>
    )
}

export default FAQAccordion
