import React, { useEffect, useState, useRef } from "react";
import './mint.css'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  OGMint,
  WhitelistedMint,
  PublicMint,
  getTotalMinted,
  isPaused,
  isOGMintLive,
  isWhitelistMintLive,
  isPublicMintLive,
  isValidOGAddress,
  isValidWlAddress,
  getNumberMinted
} from '../ulits/interact';
import {config} from '../dapp.config'



function Mint() {

const account = useAccount()

const [mutedVid, setMutedVid] = useState(true);
const handleMutedVid = () => {
  setMutedVid(!mutedVid);
};

const [isPausedState , setIsPauseState] = useState (false);
const [isOGstate , setIsOGState] = useState (false) ;
const [isWLState, setIsWLState] = useState (false) ;
const [isPublicState, setIsPublicStat] = useState (false);
const [isValidOGUser, setIsValidOGUser] = useState(false);
const [isValidWLUser, setIsValidWlUser] = useState(false);

const [numberMinted, setNumberMinted ] = useState (0);
const [totalMinted , setTotalMinted] = useState (0);

const [status, setStatus] = useState(null)
const [mintAmount, setMintAmount] = useState(1)
const [isMinting, setIsMinting] = useState(false)


useEffect(() => {
  const init = async () => {
    setTotalMinted(await getTotalMinted())

    setIsPauseState(await isPaused())
    setIsPublicStat(await isPublicMintLive())
    setIsOGState(await isOGMintLive())
    setIsWLState(await isWhitelistMintLive())
    
    
  }

  init()
}, []);

useEffect(() => {
  const init = async () => {
    setIsValidOGUser(await isValidOGAddress())
    setIsValidWlUser(await isValidWlAddress())
    setNumberMinted(await getNumberMinted())
    //Add max Mint
  }

  init()
}, );

const publicMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await PublicMint(1)

  setStatus({
    success,
    message: status
  })
  console.log(status)
  setIsMinting(false)
}

const OGMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await OGMint(mintAmount)

  setStatus({
    success,
    message: status
  })

  setIsMinting(false)
}

const WlMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await WhitelistedMint(mintAmount)

  setStatus({
    success,
    message: status
  })

  setIsMinting(false)
}


  return (
    <>
      
          <div className='mainContainer'>
            <div className='navCointainer font-Besty'>
              <h1>Home</h1>
              <img className="logo" src='config/images/logo.png'/>
              <h1>Mint</h1>
            </div>

            <div className="video_wrapper">
            <div className="inn_video_wrapper">
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid}>
                <img src="config/images/volume.png" alt="" />
              </button>
            </div>

            <video className="VideoTag" id="video" autoPlay loop muted={mutedVid}>
              <source
                src={"./config/images/vid/web3-cartoon-subtitled.mp4"}
                type="video/mp4"
              />
            </video>
            </div>
          </div>

            <div className='MintContainer'>
              <h2 className='mint_date'>MINT DATE: 29th March 2023. STAY TUNED!</h2>
              <div className='inn_mint_wrapper'>
              <img className="gif" src='config/images/BoobyB.gif'/>
              <div className='mintSection'>
                <h2>Minting is Live!</h2>
                <h3> 10 / 5000 </h3>
                {/* + and - buttons */}
                <div className="incButtonContainer"> 
                <svg xmlns="http://www.w3.org/2000/svg" className="SVG" viewBox="0 0 24 24" fill="000"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"></path></svg>
                <h1 className="mintAmount">1</h1>
                <svg xmlns="http://www.w3.org/2000/svg" className="SVG" viewBox="0 0 24 24" fill="000"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                </div>
                <h4>Max Mint Amount:4</h4>
                <div className='buttonContainer'>
                  <ConnectButton />
                  { account.isConnected? <button className='mintButton' onClick={OGMintHandler}>Mint</button> : <></>}
                </div>               
              </div>
              <img className="gif" src='config/images/BoobyB.gif'/>
              </div>
            </div>
            <h3 className="font-Besty"></h3>
          </div>
        
    </>
  )
}

export default Mint
