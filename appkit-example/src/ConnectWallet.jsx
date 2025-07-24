import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div className="text-center space-y-4">
      {isConnected ? (
        <>
          <p className="text-green-300 text-sm">
            Connected: <span className="font-mono">{address}</span>
          </p>
          <button
            onClick={() => disconnect()}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-red-400 transition duration-150"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={() => connect()}
          className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-6 rounded shadow-md hover:shadow-green-400 transition duration-150 animate-pulse"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}