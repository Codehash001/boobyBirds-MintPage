import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mint from './pages/Mint';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Chain, mainnet } from 'wagmi/chains';

const sepolia: Chain = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'SepoliaETH',
    symbol: 'SepoliaETH',
  },
  rpcUrls: {
    default: {
      http: ['https://eth-sepolia.g.alchemy.com/v2/YtSHYS1BcAFu1PPEY25zMv5cj0R39f-X'],
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [sepolia, mainnet],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  jsonRpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/YtSHYS1BcAFu1PPEY25zMv5cj0R39f-X',
  chains
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },

  {
    path: "/mint",
    element: <Mint/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
    <Mint/>
    </RainbowKitProvider>
      </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
