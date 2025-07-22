App.jsx
import BuyHFV from "./BuyHFV";
import ClaimHFV from "./ClaimHFV";
import LiveStats from "./LiveStats";
import ConnectWallet from "./ConnectWallet";

function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-sans p-6">
      <div className="max-w-md mx-auto border border-green-500 rounded-2xl shadow-lg shadow-green-500/30 p-6 space-y-8">
      </div>
        
        <img
  src="/logo.png"
  alt="HFV Logo"
  className="mx-auto w-20 h-20 mb-4 animate-pulse drop-shadow-[0_0_20px_#00ff99] transition duration-300"
/>
       <div className="max-w-md mx-auto border border-green-500 rounded-2xl shadow-lg shadow-green-500/30 p-6 space-y-8">
  <img
    src="/logo.png"
    alt="HFV Logo"
    className="mx-auto w-20 h-20 mb-4 animate-pulse drop-shadow-[0_0_12px_#00ff99]"
  /> 
       <h1 className="text-3xl font-bold text-green-500">HFV Seed Sale</h1>
        <p className="text-sm text-green-300">Buy. Track. Claim. Own the future of <span className="italic text-white">decentralized value</span>.</p>

        <ConnectWallet />
        <LiveStats />
        <BuyHFV />
        <ClaimHFV />

        <p className="text-center text-xs text-green-300 mt-4">
          Powered by <span className="font-bold text-green-400">HFV Protocol ✨</span>
        </p>
      </div>
    </div>
  );
}

export default App;