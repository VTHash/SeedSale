import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi/SeedSaleWithVesting.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function BuyHFV({ provider, walletAddress }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleBuy = async () => {
    if (!walletAddress || !amount || !provider) return;

    try {
      setLoading(true);
      setStatus("");

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const usdcAmount = ethers.parseUnits(amount, 6); // USDC usually has 6 decimals

      const tx = await contract.buyTokens(usdcAmount);
      await tx.wait();

      setStatus("Purchase successful!");
    } catch (err) {
      console.error("Buy failed:", err);
      setStatus("Purchase failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-container">
      <h2 className="section-title">Buy HFV Tokens</h2>
      <input
        type="number"
        placeholder="Enter USDC amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />
      <button
        className="glow-button"
        onClick={handleBuy}
        disabled={!walletAddress || loading || !amount}
      >
        {loading ? "Processing..." : "Buy Tokens"}
      </button>
      {status && <p className="status-text">{status}</p>}
    </div>
  );
}