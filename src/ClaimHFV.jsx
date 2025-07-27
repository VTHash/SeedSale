import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi/SeedSaleWithVesting.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function ClaimHFV({ provider, walletAddress }) {
  const [claimable, setClaimable] = useState("0");
  const [allocated, setAllocated] = useState("0");
  const [claimed, setClaimed] = useState("0");
  const [status, setStatus] = useState("");

  const getData = async () => {
    try {
      if (!provider || !walletAddress) return;

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const vesting = await contract.vesting(walletAddress);
      const claimableTokens = await contract.getClaimableTokens(walletAddress);

      setAllocated(ethers.formatUnits(vesting.totalAllocation, 18));
      setClaimed(ethers.formatUnits(vesting.totalClaimed, 18));
      setClaimable(ethers.formatUnits(claimableTokens, 18));
    } catch (err) {
      console.error("Error fetching vesting data:", err);
    }
  };

  const claimTokens = async () => {
    try {
      if (!provider || !walletAddress) return alert("Connect wallet first");

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.claim();
      await tx.wait();

      alert("HFV claimed successfully!");
      getData();
    } catch (err) {
      console.error("Claim failed:", err);
      alert("Claim failed. See console for details.");
    }
  };

  useEffect(() => {
    getData();
  }, [provider, walletAddress]);

  return (
    <div className="claim-container">
      <h2 className="section-title">Claim HFV</h2>
      <p><strong>Wallet:</strong> {walletAddress || "Not connected"}</p>
      <p><strong>Allocated:</strong> {allocated} HFV</p>
      <p><strong>Claimed:</strong> {claimed} HFV</p>
      <p><strong>Claimable:</strong> {claimable} HFV</p>
      <button
        className="glow-button"
        onClick={claimTokens}
        disabled={!claimable || claimable === "0"}
      >
        Claim Tokens
      </button>
      {status && <p className="status-text">{status}</p>}
    </div>
  );
}