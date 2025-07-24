import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';
import seedSaleAbi from '../abi/SeedSaleWithVesting.json';

const SEED_SALE_CONTRACT = import.meta.env.VITE_SEEDSALE_CONTRACT;

export default function BuyHFV() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');

  const { config } = usePrepareContractWrite({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'buyWithETH',
    value: amount ? parseEther(amount) : undefined,
    enabled: Boolean(amount),
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  const handleBuy = () => {
    if (write) write();
  };

  return (
    <div className="bg-black border border-green-500 rounded-2xl p-6 text-green-400 shadow-xl">
      <h2 className="text-xl font-bold mb-4">💸 Buy HFV with ETH</h2>
      <input
        className="w-full p-2 mb-4 bg-gray-800 border border-green-400 rounded text-white"
        placeholder="Amount in ETH (min $250)"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleBuy}
        disabled={!write || isLoading}
        className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded w-full"
      >
        {isLoading ? 'Processing...' : 'Buy HFV'}
      </button>
      {isSuccess && <p className="text-green-300 mt-2">✅ Purchase successful! Check claim tab later.</p>}
    </div>
  );
}