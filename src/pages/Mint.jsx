import React from 'react'
import './mint.css'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


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
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid}>
                <img src="config/images/volume.png" alt="" />
              </button>
            </div>

            <video className="VideoTag" id="video" autoPlay loop muted>
              <source
                src={"./config/images/vid/Web3_cartoon.mp4"}
                type="video/mp4"
              />
            </video>
          </div>

            <div className='MintContainer font-Besty'>
              <h1 className='mint_date'>MINT DATE: March 2023. STAY TUNED!</h1>
              <div className='mintSection'>
                <h1>Public Sale is Live!</h1>
                <h2> 10 / 5000 NFTs Minted</h2>
                <h2>Max Mint Amount  : 2</h2>
                <div className='buttonContainer'>
                  <ConnectButton />
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
