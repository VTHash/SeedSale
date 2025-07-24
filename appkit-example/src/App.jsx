import React from "react";
import ConnectWallet from "./ConnectWallet";
import BuyHFV from "./BuyHFV";
import ClaimHFV from "./ClaimHFV";
import LiveStats from "./LiveStats";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-sans p-6 animate-glow">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center neon-text">HFV Seed Sale</h1>

        <section className="glow-box p-6 rounded-2xl shadow-xl">
          <ConnectWallet />
        </section>

        <section className="glow-box p-6 rounded-2xl shadow-xl">
          <LiveStats />
        </section>

        <section className="glow-box p-6 rounded-2xl shadow-xl">
          <BuyHFV />
        </section>

        <section className="glow-box p-6 rounded-2xl shadow-xl">
          <ClaimHFV />
        </section>
      </div>
    </div>
  );
}
