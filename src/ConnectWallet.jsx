import React from "react";
import walletConnectLogo from "../wallet-connect-logo.png";
export default function ConnectWallet({ connectMetaMask, connectWalletConnect, walletAddress }) {
  return (
    <div className="wallet-connection">
      <button className="glow-button" onClick={connectMetaMask}>
        Connect MetaMask
      </button>

      <button className="glow-button" onClick={connectWalletConnect}>
        <img src={walletConnectLogo} alt="WalletConnect" className="walletconnect-logo" />
      </button>

      {walletAddress ? (
        <p className="wallet-address">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      ) : (
        <p className="wallet-address">Not Connected</p>
      )}
    </div>
  );
}