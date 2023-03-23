import React, { useEffect, useState, useRef } from "react";
import './mint.css'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
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


const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://eth-goerli.g.alchemy.com/v2/bYwv6lWEDB1KoLyivwgn_7YhZNSOkCRy', priority: 0,
      }),
    }),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  jsonRpcUrl: 'https://eth-goerli.g.alchemy.com/v2/bYwv6lWEDB1KoLyivwgn_7YhZNSOkCRy',
  chains
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});



function Mint() {

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
    setIsValidWlUser(await isValidWLUser())
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
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className='mainContainer'>
            <div className='navCointainer font-Besty'>
              <h1>Home</h1>
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
              <h1 className='mint_date'>MINT DATE: 29th March 2023. STAY TUNED!</h1>
              <div className='mintSection'>
                <h1>Public Sale is Live!</h1>
                <h2> 10 / 5000 NFTs Minted</h2>
                <h2>Max Mint Amount  : 2</h2>
                <div className='buttonContainer'>
                  <ConnectButton />
                  <button onClick={publicMintHandler}>Mint</button>
                </div>               
              </div>
            </div>
            <h3 className="font-Besty"></h3>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default Mint
