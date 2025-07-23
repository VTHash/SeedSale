BuyHFV.jsx
import { useState } from "react"; 
import { ethers } from "ethers"; 
import abi from "./abi/SeedSaleWithVesting.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function BuyHFV() { const [ethAmount, setEthAmount] = useState(""); 
const [loading, setLoading] = useState(false); 
const [message, setMessage] = useState("");

const buyTokens = async () => { setLoading(true); 
try { const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
const tx = await contract.buyWithETH({
value: ethers.utils.parseEther(ethAmount),
});
await tx.wait();
setMessage("✅ Purchase successful!");
} catch (err) {
console.error(err);
setMessage("❌ Transaction failed");
}
setLoading(false);

};

return (
     <div className="space-y-4"> <h2 className="text-2xl font-bold text-green-500">Buy HFV</h2> <input type="number" step="0.01" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} placeholder="Enter ETH amount" className="w-full p-3 rounded-lg bg-black text-green-400 border border-green-500 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" /> <button
onClick={buyTokens}
className="w-full py-3 px-6 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-400 transition duration-300"
> Buy HFV with ETH </button> </div> ); }

export default BuyHFV;