ConnectWallet.jsx 
import { useEffect, useState } from "react"; 
import { ethers } from "ethers";

function ConnectWallet({ onConnect })
{ const [account, setAccount] = useState(null);
useEffect(() => { if (window.ethereum) 
{ window.ethereum.on("accountsChanged", 
(accounts) => { setAccount(accounts[0] || null);
onConnect?.(accounts[0]); }); } },  [onConnect]);

const connect = async () => { if (window.ethereum) 
{ const accounts = await window.ethereum.request
({ method: "eth_requestAccounts" }); 
setAccount(accounts[0]); onConnect?.(accounts[0]); } };

return ( <div className="flex justify-between items-center bg-black border border-green-500 rounded-xl px-4 py-3 text-sm text-green-400"> <div> {account ? ( <span className="font-mono">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span> ) : ( <span>Not connected</span> )} </div> <button
onClick={connect}
className="ml-4 px-4 py-2 bg-green-500 text-black font-semibold rounded-lg shadow hover:bg-green-400 transition"
> {account ? "Connected" : "Connect Wallet"} </button> </div> ); }

export default ConnectWallet;

