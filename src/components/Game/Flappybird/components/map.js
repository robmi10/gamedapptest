import React from 'react'

const GameBox = ({height, width, image}) => {

  return (
    <div
    style={{
        position: "relative",
        backgroundImage: `url(${image})`, 
        backgroundsize: "cover", 
        height: height,
        width: width,
        overflow: 'hidden',
    }}>

    </div>
  )
}

export default GameBox