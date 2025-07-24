import { useState } from 'react';
import { parseEther } from 'viem';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import seedSaleAbi from './abi/SeedSaleWithVesting.json';

const SEED_SALE_CONTRACT = import.meta.env.VITE_SEEDSALE_CONTRACT;

export default function BuyHFV() {
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const ethValue = parseEther(ethAmount || '0');

  const { config } = usePrepareContractWrite({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'buyWithETH',
    value: ethValue,
    enabled: isConnected && !!ethAmount && Number(ethAmount) > 0,
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: () => {
      setMessage('✅ Transaction submitted');
      setLoading(false);
    },
    onError: (err) => {
      console.error(err);
      setMessage('❌ Transaction failed');
      setLoading(false);
    },
  });

  const handleBuy = async () => {
    setLoading(true);
    if (write) write();
    else {
      setMessage('⚠️ Cannot send transaction');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-500">Buy HFV</h2>
      <input
        type="number"
        step="0.01"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        placeholder="Enter ETH amount"
        className="w-full px-3 py-2 rounded text-black"
      />
      <button
        onClick={handleBuy}
        disabled={isLoading}
        className="w-full py-3 px-6 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-400 transition duration-300"
      >
        {isLoading ? 'Processing...' : 'Buy HFV with ETH'}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}