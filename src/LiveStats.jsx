import { useAccount, useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import seedSaleAbi from './abi/SeedSaleWithVesting.json';

const SEED_SALE_CONTRACT = import.meta.env.VITE_SEEDSALE_CONTRACT;
const TOTAL_ALLOC = 2100000; // 2.1M HFV tokens

export default function LiveStats() {
  const { address, isConnected } = useAccount();

  const { data: sold } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'totalTokensSold',
    watch: true,
  });

  const { data: allocated } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'getUserAllocation',
    args: [address],
    enabled: isConnected,
    watch: true,
  });

  const { data: claimed } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'getUserClaimed',
    args: [address],
    enabled: isConnected,
    watch: true,
  });

  const { data: claimable } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'getUserClaimable',
    args: [address],
    enabled: isConnected,
    watch: true,
  });

  return (
    <div className="mt-8 space-y-4 border-t border-green-800 pt-4 text-green-400">
      <p className="text-xl font-semibold">
        Sold: {sold ? `${formatUnits(sold, 18)} / ${TOTAL_ALLOC.toLocaleString()} HFV` : '...'}
      </p>

      {isConnected && (
        <>
          <p className="text-sm">Allocated: {allocated ? formatUnits(allocated, 18) : '0'} HFV</p>
          <p className="text-sm">Claimed: {claimed ? formatUnits(claimed, 18) : '0'} HFV</p>
          <p className="text-sm">Claimable: {claimable ? formatUnits(claimable, 18) : '0'} HFV</p>
        </>
      )}
    </div>
  );
}