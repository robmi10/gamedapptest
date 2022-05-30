import React from 'react'

const Obstacle = ({top, height, width, left}) => {

  return (

    <div style={{
        position: "relative",
        backgroundColor: 'green',
        height: height,
        width: width,
        left: left,
        top: top,
        borderRadius: "10px",
    }}>

        
    </div>
  )
}

export default Obstacle