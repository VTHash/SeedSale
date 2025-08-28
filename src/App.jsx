import React, { useState } from "react";
import BuyHFV from "./BuyHFV";
import ClaimHFV from "./ClaimHFV";
import LiveStats from "./LiveStats";
import ConnectWallet from "./ConnectWallet";
import "./index.css";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { BrowserProvider } from "ethers";
import walletConnectLogo from "../wallet-connect-logo.png";
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
    
    if (wcProvider.session) { 
      await wcProvider.disconnect();
    }
    await wcProvider.enable();

    const browserProvider = new BrowserProvider(wcProvider);
    const signer = await browserProvider.getSigner();
    const address = await signer.getAddress();

    setProvider(browserProvider);
    setWalletAddress(address);
    wcProvider.on("disconnect", () => {
      setProvider(null);
      setWalletAddress(null);
    });
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
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
  <a
    href="https://etherscan.io/address/0xeAb3B66a24bD99171E0a854b6dA215CE3A7FFa98"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://etherscan.io/images/brandassets/etherscan-logo-light-circle.png"
      alt="Powered by Etherscan"
      style={{ height: "32px", opacity: 0.8 }}
    />
  </a>
      </div>
    </div>
</div>
  );
  }
