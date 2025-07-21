BuyHFV.jsx
import { useState } from "react"; 
import { ethers } from "ethers"; 
import abi from "../abi/SeedSaleWithVesting.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function BuyHFV() { const [ethAmount, setEthAmount] = useState(""); 
const [loading, setLoading] = useState(false); 
const [message, setMessage] = useState("");

const buy = async () => { setLoading(true); 
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

return ( <div className="bg-green-900 p-4 rounded shadow">
 <h2 className="text-xl font-bold mb-2">Buy HFV with ETH</h2> 
 <input type="text" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} placeholder="Amount in ETH" className="w-full p-2 text-black mb-2" /> 
 <button onClick={buy} disabled={loading} className="bg-green-500 px-4 py-2 rounded"> 
 {loading ? "Processing..." : "Buy HFV"} 
 </button> <p className="mt-2 text-sm">{message}
    </p> 
    </div> ); }

export default BuyHFV;