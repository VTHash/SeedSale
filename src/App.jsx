App.jsx
import BuyHFV from "./components/BuyHFV";
import ClaimHFV from "./components/ClaimHFV";
import LiveStats from "./components/LiveStats";
import ConnectWallet from "./components/ConnectWallet";

function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">HFV Seed Sale</h1>
          <p className="text-lg mt-2 text-green-200">Buy. Track. Claim. Own the future of decentralized value.</p>
        </header>

        <ConnectWallet />

        <LiveStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BuyHFV />
          <ClaimHFV />
        </div>

        <footer className="text-center text-green-700 text-sm pt-12">
          Powered by HFV Protocol ✨
        </footer>
      </div>
    </div>
  );
}

export default App;