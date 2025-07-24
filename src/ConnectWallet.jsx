

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export default function ConnectWallet() {
  const { open } = useAppKit();
  const account = useAppKitAccount({ namespace: 'eip155' }); // Ethereum only

  return account.isConnected ? (
    <div className="text-green-400 font-mono text-sm">
      Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
    </div>
  ) : (
    <button
      onClick={() => open({ view: 'Connect', namespace: 'eip155' })}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md"
    >
      Connect Wallet
    </button>
  );
}