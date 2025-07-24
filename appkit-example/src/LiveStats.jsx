import { useAccount, useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import seedSaleAbi from '../abi/SeedSaleWithVesting.json';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const SEED_SALE_CONTRACT = import.meta.env.VITE_SEEDSALE_CONTRACT;
const TOTAL_ALLOC = 2100000; // Total HFV tokens for sale

const COLORS = ['#00ff99', '#1f1f1f']; // Green sold, dark remaining

export default function LiveStats() {
  const { data: sold } = useContractRead({
    address: SEED_SALE_CONTRACT,
    abi: seedSaleAbi,
    functionName: 'totalTokensSold',
    watch: true,
  });

  const soldTokens = sold ? Number(formatUnits(sold, 18)) : 0;
  const remaining = TOTAL_ALLOC - soldTokens;

  const data = [
    { name: 'Sold', value: soldTokens },
    { name: 'Remaining', value: remaining }
  ];

  return (
    <div className="bg-black border border-green-500 rounded-2xl p-6 text-green-400 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-green-500">📊 HFV Seed Sale Stats</h2>
      <p><strong>Total Allocation:</strong> {TOTAL_ALLOC.toLocaleString()} HFV</p>
      <p><strong>Sold:</strong> {soldTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} HFV</p>
      <p><strong>Remaining:</strong> {remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })} HFV</p>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#00ff99', color: '#00ff99' }}
              formatter={(value: any) => [`${value.toLocaleString()} HFV`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}