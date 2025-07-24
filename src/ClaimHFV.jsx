import { useState } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import seedSaleAbi from './abi/SeedSaleWithVesting.json';

const SEED_SALE_CONTRACT = import.meta.env.VITE_SEEDSALE_CONTRACT;

export default function ClaimHFV() {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { config } = usePrepareContractWrite({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'claim',
    enabled: isConnected,
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: () => {
      setMessage('✅ Claimed successfully');
      setLoading(false);
    },
    onError: (err) => {
      console.error(err);
      setMessage('❌ Claim failed');
      setLoading(false);
    },
  });

  const handleClaim = async () => {
    setLoading(true);
    if (write) write();
    else {
      setMessage('⚠️ Cannot claim right now');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-bold text-green-500">Claim HFV</h2>
      <button
        onClick={handleClaim}
        disabled={isLoading}
        className="w-full py-3 px-6 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-400 transition duration-300"
      >
        {isLoading ? 'Claiming...' : 'Claim My HFV'}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
