ClaimHFV.jsx
import { useState } from "react"; 
import { ethers } from "ethers"; 
import abi from "./abi/SeedSaleWithVesting.json";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
function ClaimHFV() { const [loading, setLoading] = useState(false); 
const [allocated, setAllocated] = useState(0);
const [claimed, setClaimed] = useState(0);
const [claimable, setClaimable] = useState(0);
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

return ( <div className="space-y-4 mt-8"> <h2 className="text-2xl font-bold text-green-500">Vesting</h2> <div className="text-sm text-gray-300">Allocated: <span className="text-white font-semibold">{allocated} HFV</span></div> <div className="text-sm text-gray-300">Claimed: <span className="text-white font-semibold">{claimed} HFV</span></div> <div className="text-sm text-gray-300">Claimable Now: <span className="text-green-400 font-bold">{claimable} HFV</span></div> <button
onClick={claim}
className="w-full py-3 px-6 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-400 transition duration-300"
> Claim Tokens </button> </div> ); }

export default ClaimHFV;

