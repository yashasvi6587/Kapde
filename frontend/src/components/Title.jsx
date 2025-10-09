import React from 'react'
import '../Styles/Title.css'

const Title = ({ text1, text2 }) => {
  return (
    <div className="title-container">
      <p className="title-text">
        {text1} <span className="highlight">{text2}</span>
      </p>
      <div className="title-underline"></div>
    </div>
  )
}

export default Title
