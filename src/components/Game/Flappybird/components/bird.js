import React from 'react'

const Bird = ({size, top, image}) => {

  return (

    <>
        <div style={{
            position: "absolute",
            backgroundImage: `url(${image})`, 
            backgroundsize: "cover", 
            height: size,
            width: size,
            top: top,
        }}>

        </div>
    </>
 
  )
}

export default Bird