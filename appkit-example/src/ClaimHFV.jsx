import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { formatUnits } from 'viem';
import seedSaleAbi from '../abi/SeedSaleWithVesting.json';

const SEED_SALE_CONTRACT = process.meta.env.VITE_SEEDSALE_CONTRACT;

export default function ClaimHFV() {
  const { address, isConnected } = useAccount();

  const { data: claimable } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'getClaimableAmount',
    args: [address],
    watch: true,
  });

  const { write, isLoading, isSuccess } = useContractWrite({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'claim',
  });

  const claimableFormatted = claimable
    ? parseFloat(formatUnits(claimable, 18)).toFixed(2)
    : '...';

  return (
    <div className="bg-black border border-green-500 rounded-2xl p-6 text-green-400 shadow-xl">
      <h2 className="text-xl font-bold mb-4">🎁 Claim Your HFV</h2>
      <p><strong>Claimable Tokens:</strong> {claimableFormatted} HFV</p>
      <button
        onClick={() => write()}
        disabled={!write || isLoading}
        className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded w-full mt-4"
      >
        {isLoading ? 'Claiming...' : 'Claim Now'}
      </button>
      {isSuccess && <p className="text-green-300 mt-2">✅ Tokens Claimed!</p>}
    </div>
  );
}