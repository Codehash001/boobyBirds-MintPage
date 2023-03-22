import React from 'react'
import './mint.css'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider ,ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient,useClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});

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

          
        </div>
        </div>


          


        <h3 className="font-Besty"></h3>
      </div>
    </>
  )
}

export default Mint
