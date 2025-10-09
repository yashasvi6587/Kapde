import React from 'react'
import { assets } from '../assets/assets'
import '../Styles/OurPolicy.css'

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Faster delivery",
    desc: "Get what you love, at your doorstep, faster than ever."
  },
  {
    icon: assets.quality_icon,
    title: "Special niche wares",
    desc: "Handpicked unique collections you won’t find anywhere else."
  },
  {
    icon: assets.support_img,
    title: "Better prices",
    desc: "Top-quality products at prices that make you smile."
  }
]

const OurPolicy = () => {
  return (
    <div className="bg-white text-black  py-16 px-6 md:px-20 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="group policy-card border border-gray-200 p-6 rounded-xl text-center shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-16 h-16 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110"
            />
            <p className="text-lg font-semibold mb-2">{policy.title}</p>
            <p className="text-sm text-gray-600">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
