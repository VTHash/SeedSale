import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi/SeedSaleWithVesting.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const TOTAL_ALLOC = 2_100_000; // 2.1M HFV total tokens for seed sale

export default function LiveStats({ provider, walletAddress }) {
  const [sold, setSold] = useState("0");
  const [allocated, setAllocated] = useState("0");
  const [claimed, setClaimed] = useState("0");
  const [claimable, setClaimable] = useState("0");

  const getStats = async () => {
    try {
      if (!provider) return;

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const totalSold = await contract.totalTokensSold();
      setSold(ethers.formatUnits(totalSold, 18));

      if (walletAddress) {
        const vesting = await contract.vesting(walletAddress);
        const claimableTokens = await contract.getClaimableTokens(walletAddress);

        setAllocated(ethers.formatUnits(vesting.totalAllocation, 18));
        setClaimed(ethers.formatUnits(vesting.totalClaimed, 18));
        setClaimable(ethers.formatUnits(claimableTokens, 18));
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  useEffect(() => {
    getStats();
  }, [provider, walletAddress]);

  return (
    <div className="stats-container">
      <h2 className="section-title">Live Stats</h2>
      <p><strong>Sold:</strong> {sold} / {TOTAL_ALLOC.toLocaleString()} HFV</p>

      {walletAddress && (
        <>
          <p><strong>Allocated:</strong> {allocated} HFV</p>
          <p><strong>Claimed:</strong> {claimed} HFV</p>
          <p><strong>Claimable:</strong> {claimable} HFV</p>
        </>
      )}
    </div>
  );
}