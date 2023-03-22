import React from 'react'
import './mint.css'

function Mint() {
  return (
    <>
      <div className='mainContainer'>
        <div className='navCointainer font-face-main'>
          <h1>Home</h1>
          <h1>Mint</h1>
        </div>
        <div className='videoContainer'>
            <video id="video" autoPlay loop muted>
              <source
                src={"/config/images/vid/Web3_cartoon.mp4"}
                type="video/mp4"
              />
            </video>
        </div>
        <div className='MintContainer'></div>
      </div>
    </>
  )
}

export default Mint
