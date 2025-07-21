ClaimHFV.jsx
import { useState } from "react"; 
import { ethers } from "ethers"; 
import abi from "../abi/SeedSaleWithVesting.json";
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
function ClaimHFV() { const [loading, setLoading] = useState(false); 
const [message, setMessage] = useState("");
const claim = async () => { setLoading(true); 
try { const provider = new ethers.providers.Web3Provider(window.ethereum); 
const signer = provider.getSigner(); 
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
const tx = await contract.claim();
await tx.wait();
setMessage("✅ Claimed successfully");
} catch (err) {
console.error(err);
setMessage("❌ Claim failed");
}
setLoading(false);

};

return ( <div className="bg-green-800 p-4 rounded shadow">
     <h2 className="text-xl font-bold mb-2">Claim Vested HFV</h2>
      <button onClick={claim} disabled={loading} 
      className="bg-green-500 px-4 py-2 rounded"> {loading ? "Claiming..." : "Claim Tokens"}
         </button> <p className="mt-2 text-sm">{message}</p> </div> ); }

export default ClaimHFV;

