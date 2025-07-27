import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      ethProvider.send("eth_accounts", []).then(accounts => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      });

      window.ethereum.on("accountsChanged", accounts => {
        setAddress(accounts[0] || null);
      });
    }
  }, []);

  return { address, provider };
}