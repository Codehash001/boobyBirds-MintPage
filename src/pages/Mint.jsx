import React from 'react'
import './mint.css'

function Mint() {
  return (
    <>
      <div className='mainContainer'>
        <div className='navCointainer font-Besty'>
          <h1>Home</h1>
          <h1>Mint</h1>
        </div>

        <div className='videoContainer'>
            <video  className='vid' id="video" autoPlay loop muted>
              <source
                src={"/config/images/vid/Web3_cartoon.mp4"}
                type="video/mp4"
              />
            </video>
        </div>

        <div className='MintContainer'></div>

        <h3 className="mint_date font-Kiddos">MINT DATE: March 2023. STAY TUNED!</h3>
      </div>
    </>
  )
}

export default Mint
