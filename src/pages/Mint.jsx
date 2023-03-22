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

        <div className='MintContainer'>

        <h1 className='mint_date'>MINT DATE: March 2023. STAY TUNED!</h1>

        <div className='mintSection'>
          <h2>Public Sale is Live!</h2>
          <h2>Connected : 0x2d...c2c</h2>
          <h2> 10 / 5000 NFTs Minted</h2>
          <h2>Max Mint Amount  : 2</h2>

          <button> Connect Wallet</button>
        </div>
        </div>


          


        <h3 className="font-Besty"></h3>
      </div>
    </>
  )
}

export default Mint
