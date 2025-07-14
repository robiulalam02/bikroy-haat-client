import React, { useContext } from 'react'
import BannerSlider from '../Banner/BannerSlider'
import Products from '../All Products/Products'
import Advertisements from '../Advertisements/Advertisements'
import BuyerTips from '../ReviewSlider/BuyerTips'
import ReviewSlider from '../ReviewSlider/ReviewSlider'
import SeasonalPicks from '../SeasonalPicks/SeasonalPicks'
import { AuthContext } from '../../../Providers/AuthContext'

const Home = () => {

  return (
    <div>
      <BannerSlider />
      <Products />
      <Advertisements />
      <BuyerTips />
      <SeasonalPicks />
    </div>
  )
}

export default Home
