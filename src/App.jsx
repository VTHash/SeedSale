import React, { useState } from "react";
import BuyHFV from "./BuyHFV";
import ClaimHFV from "./ClaimHFV";
import LiveStats from "./LiveStats";
import ConnectWallet from "./ConnectWallet";
import "./index.css";

import EthereumProvider from "@walletconnect/ethereum-provider";
import { BrowserProvider } from "ethers";

// Import env variables (must start with VITE_)
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const INFURA_ID = import.meta.env.VITE_INFURA_PROJECT_ID;

export default function App() {
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  // 🔗 Connect with MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      const browserProvider = new BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      setProvider(browserProvider);
      setWalletAddress(address);
    } else {
      alert("MetaMask not found");
    }
  };

  // 🔗 Connect with WalletConnect v2
  const connectWalletConnect = async () => {
    const wcProvider = await EthereumProvider.init({
      projectId: WALLETCONNECT_PROJECT_ID,
      chains: [1], // Ethereum mainnet
      showQrModal: true,
      rpcMap: {
        1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      },
    });

    await wcProvider.enable();

    const browserProvider = new BrowserProvider(wcProvider);
    const signer = await browserProvider.getSigner();
    const address = await signer.getAddress();

    setProvider(browserProvider);
    setWalletAddress(address);
  };

  return (
    <div className="app-wrapper">
      <div className="glow-frame">
        <header className="app-header">
          <img src="/hfv-logo.png" alt="HFV Logo" className="logo" />
          <h1 className="app-title">HFV Seed Sale Dashboard</h1>
          <ConnectWallet
            connectMetaMask={connectMetaMask}
            connectWalletConnect={connectWalletConnect}
            walletAddress={walletAddress}
          />
        </header>

        <main className="main-content">
          <LiveStats provider={provider} walletAddress={walletAddress} />
          <BuyHFV provider={provider} walletAddress={walletAddress} />
          <ClaimHFV provider={provider} walletAddress={walletAddress} />
        </main>
      </div>
    </div>
  );
}