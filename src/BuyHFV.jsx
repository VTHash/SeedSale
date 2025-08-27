import React, { useState } from "react";
import { ethers } from "ethers";
import saleAbi from "./abi/SeedSaleWithVesting.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
// Mainnet USDC; if you’re on a different chain, put it in an env var
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const erc20Abi = [
  "function approve(address spender, uint256 value) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

export default function BuyHFV({ provider, walletAddress }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("usdc"); // 'usdc' or 'eth'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const errText = (e) =>
    e?.shortMessage || e?.reason || e?.message || "Purchase failed.";

  const ensureBasics = async () => {
    if (!walletAddress) throw new Error("Connect your wallet first.");
    if (!amount || Number(amount) <= 0) throw new Error("Enter an amount > 0.");
    if (!provider?.getSigner) throw new Error("No browser wallet provider.");
    if (!contractAddress || !ethers.isAddress(contractAddress))
      throw new Error("Sale contract address is invalid.");

    // Ensure the contract exists on the current chain
    const code = await provider.getCode(contractAddress);
    if (code === "0x") {
      const net = await provider.getNetwork();
      throw new Error(
        `No contract at ${contractAddress} on chainId ${net.chainId}. Switch network.`
      );
    }
  };

  const handleBuy = async () => {
    setLoading(true);
    setStatus("");
    try {
      await ensureBasics();

      const signer = await provider.getSigner();
      const user = await signer.getAddress();

      if (paymentMethod === "usdc") {
        // ---------- USDC PATH (safe prechecks + approval) ----------
        const usdc = new ethers.Contract(USDC_ADDRESS, erc20Abi, signer);
        const sale = new ethers.Contract(contractAddress, saleAbi, signer);

        const dec = await usdc.decimals(); // should be 6 for USDC
        const usdcAmount = ethers.parseUnits(amount, dec);

        // Balance check
        const bal = await usdc.balanceOf(user);
        if (bal < usdcAmount) {
          setStatus("Insufficient USDC balance.");
          setLoading(false);
          return;
        }

        // Allowance check
        const allowance = await usdc.allowance(user, contractAddress);
        if (allowance < usdcAmount) {
          setStatus("Approving USDC...");
          const txA = await usdc.approve(contractAddress, usdcAmount);
          await txA.wait();
        }

        // Optional: simulate to get clean revert reasons (min purchase, cap, etc.)
        await sale.buyWithUSDC.staticCall(usdcAmount);

        setStatus("Buying with USDC...");
        const tx = await sale.buyWithUSDC(usdcAmount);
        await tx.wait();
        setStatus("Purchase with USDC successful!");
      } else {
        // ---------- ETH PATH (force MetaMask popup) ----------
        // We intentionally BYPASS ethers' preflight so MetaMask opens
        const iface = new ethers.Interface(saleAbi);
        const data = iface.encodeFunctionData("buyWithETH", []);
        const value = ethers.parseEther(amount);

        // (Optional) quick human-friendly precheck for obvious low balance
        // Not strictly required since we want popup no matter what:
        // const bal = await provider.getBalance(user);
        // if (bal < value) setStatus("Warning: your ETH may be insufficient (value + gas).");

        setStatus("Opening wallet...");
        const tx = await signer.sendTransaction({
          to: contractAddress,
          data,
          value
          // gasLimit: you can set if needed; otherwise wallet will estimate
        });
        setStatus("Processing transaction...");
        await tx.wait();
        setStatus("Purchase with ETH successful!");
      }
    } catch (e) {
      console.error(e);
      setStatus(errText(e));
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
          style={{ width: 20, height: 20, marginRight: 8, verticalAlign: "middle" }}
        />
        Buy HFV Tokens
      </h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          className={`glow-button ${paymentMethod === "usdc" ? "active" : ""}`}
          onClick={() => handleToggle("usdc")}
        >
          <img src="/usdc.png" alt="USDC" style={{ width: 20, marginRight: 6 }} />
          USDC
        </button>
        <button
          className={`glow-button ${paymentMethod === "eth" ? "active" : ""}`}
          onClick={() => handleToggle("eth")}
        >
          <img src="/eth.png" alt="ETH" style={{ width: 20, marginRight: 6 }} />
          ETH
        </button>
      </div>

      <input
        type="number"
        min="0"
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