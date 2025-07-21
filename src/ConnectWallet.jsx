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

return ( <div className="text-center"> 
{account ? ( <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p> ) : 
( <button onClick={connect} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"> Connect Wallet </button> )} </div> ); }

export default ConnectWallet;

