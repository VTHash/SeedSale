LiveStats.jsx
import React, { useState, useEffect } from "react"
const CONTRACT_ADDRESS = "0xbE39EbB5DaE5292658efF152Ec4EE37Ddc558812";
function LiveStats() { const [sold, setSold] = useState(0); 
const HFV_CAP = 2100000;
useEffect(() => { async function fetchSold() 
{ const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider); 
const total = await contract.totalSold(); 
setSold(parseFloat(ethers.utils.formatUnits(total, 18)));}
if (window.ethereum) fetchSold(); }, []);

return ( <div className="text-center text-lg"> <p>Sold: {sold.toLocaleString()} / {HFV_CAP.toLocaleString()} HFV</p> </div> ); }

export default LiveStats;

