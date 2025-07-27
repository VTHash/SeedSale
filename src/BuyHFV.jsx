import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi/SeedSaleWithVesting.json";
import usdcAbi from "./abi/USDC.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const usdcAddress = import.meta.env.VITE_USDC_CONTRACT;

export default function BuyHFV({ provider, walletAddress }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentToken, setPaymentToken] = useState("USDC"); // USDC or ETH

  const handleBuy = async () => {
    if (!provider || !walletAddress || !amount) return;

    try {
      setLoading(true);
      setStatus("");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      if (paymentToken === "USDC") {
        const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, signer);
        const usdcAmount = ethers.parseUnits(amount, 6);

        const allowance = await usdcContract.allowance(walletAddress, contractAddress);
        if (allowance < usdcAmount) {
          const approveTx = await usdcContract.approve(contractAddress, usdcAmount);
          await approveTx.wait();
        }

        const tx = await contract.buyTokens(usdcAmount);
        await tx.wait();
        setStatus("Purchased with USDC!");
      } else {
        const ethAmount = ethers.parseEther(amount);
        const tx = await contract.buyTokensWithETH({ value: ethAmount });
        await tx.wait();
        setStatus("Purchased with ETH!");
      }
    } catch (err) {
      console.error("Buy failed:", err);
      setStatus("Purchase failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-container">
      <h2 className="section-title">Buy HFV Tokens</h2>

      <div className="payment-toggle">
        <label>
          <input
            type="radio"
            name="paymentToken"
            value="USDC"
            checked={paymentToken === "USDC"}
            onChange={() => setPaymentToken("USDC")}
          />{" "}
          USDC
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="paymentToken"
            value="ETH"
            checked={paymentToken === "ETH"}
            onChange={() => setPaymentToken("ETH")}
          />{" "}
          ETH
        </label>
      </div>

      <input
        type="number"
        placeholder={`Enter ${paymentToken} amount`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />

      <button
        className="glow-button"
        onClick={handleBuy}
        disabled={!walletAddress || loading || !amount}
      >
        {loading ? "Processing..." : `Buy with ${paymentToken}`}
      </button>

      {status && <p className="status-text">{status}</p>}
    </div>
  );
}