import React from 'react'

import BestSeler from '../components/BestSeler'
import Hero from '../components/Hero'
import USP from '../components/USP'
import Testimonials from '../components/Testimonials'
import FeaturedCategories from '../components/FeaturedCategories'
import Trending from '../components/Trending'
import PremiumComboOffer from '../components/PremiumComboOffer'


const Home = () => {
  return (
    <div>
      <Hero/>
      <PremiumComboOffer/>
      <BestSeler />
      <Trending/>
      <FeaturedCategories/>
      <USP/>
      <Testimonials/>
    </div>
  )
}

export default Home
