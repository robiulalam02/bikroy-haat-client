import React, { useContext } from 'react'
import BannerSlider from '../Banner/BannerSlider'
import Products from '../All Products/Products'
import Advertisements from '../Advertisements/Advertisements'
import BuyerTips from '../ReviewSlider/BuyerTips'
import ReviewSlider from '../ReviewSlider/ReviewSlider'
import SeasonalPicks from '../SeasonalPicks/SeasonalPicks'
import { AuthContext } from '../../../Providers/AuthContext'
import { Helmet } from 'react-helmet-async'
import RecentProducts from '../RecentProducts/RecentProducts'
import Subscribe from '../Subscribe/Subscribe'

const Home = () => {

  return (
    <div>
      <Helmet>
        <title>Bikroy Haat | Home</title>
      </Helmet>
      <BannerSlider />
      <Products />
      <RecentProducts />
      <Advertisements />
      <SeasonalPicks />
      <BuyerTips />
      <Subscribe />
    </div>
  )
}

export default Home
