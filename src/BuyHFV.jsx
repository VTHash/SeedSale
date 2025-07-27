import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi/SeedSaleWithVesting.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function BuyHFV({ provider, walletAddress }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("usdc"); // 'usdc' or 'eth'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleBuy = async () => {
    if (!walletAddress || !amount) return;

    try {
      setLoading(true);
      setStatus("");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      if (paymentMethod === "usdc") {
        const usdcAmount = ethers.parseUnits(amount, 6); // USDC uses 6 decimals
        const tx = await contract.buyTokens(usdcAmount);
        await tx.wait();
        setStatus("Purchase with USDC successful!");
      } else {
        const ethAmount = ethers.parseEther(amount);
        const tx = await contract.buyTokensWithETH({ value: ethAmount });
        await tx.wait();
        setStatus("Purchase with ETH successful!");
      }
    } catch (err) {
      console.error("Buy failed:", err);
      setStatus("Purchase failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (method) => {
    setPaymentMethod(method);
    setAmount("");
    setStatus("");
  };

  return (
    <div className="buy-container">
      <h2 className="section-title">
        <img
          src="/hfv-logo.png"
          alt="HFV Logo"
          style={{ width: "20px", height: "20px", marginRight: "8px", verticalAlign: "middle" }}
        />
        Buy HFV Tokens
      </h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <button
          className={`glow-button ${paymentMethod === "usdc" ? "active" : ""}`}
          onClick={() => handleToggle("usdc")}
        >
          <img src="/usdc.png" alt="USDC" style={{ width: "20px", marginRight: "6px" }} />
          USDC
        </button>
        <button
          className={`glow-button ${paymentMethod === "eth" ? "active" : ""}`}
          onClick={() => handleToggle("eth")}
        >
          <img src="/eth.png" alt="ETH" style={{ width: "20px", marginRight: "6px" }} />
          ETH
        </button>
      </div>

      <input
        type="number"
        placeholder={`Enter ${paymentMethod.toUpperCase()} amount`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />

      <button
        className="glow-button"
        onClick={handleBuy}
        disabled={!walletAddress || loading || !amount}
      >
        {loading ? "Processing..." : `Buy with ${paymentMethod.toUpperCase()}`}
      </button>

      {status && <p className="status-text">{status}</p>}
    </div>
  );
}