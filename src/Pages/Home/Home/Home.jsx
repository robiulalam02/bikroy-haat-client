import React, { useContext } from 'react'
import BannerSlider from '../Banner/BannerSlider'
import AllProducts from '../All Products/AllProducts'
import Advertisements from '../Advertisements/Advertisements'
import BuyerTips from '../ReviewSlider/BuyerTips'
import ReviewSlider from '../ReviewSlider/ReviewSlider'
import SeasonalPicks from '../SeasonalPicks/SeasonalPicks'
import { AuthContext } from '../../../Providers/AuthContext'

const Home = () => {

  return (
    <div>
      <BannerSlider />
      <AllProducts />
      <Advertisements />
      <BuyerTips />
      {/* <ReviewSlider /> */}
      <SeasonalPicks />
    </div>
  )
}

export default Home
