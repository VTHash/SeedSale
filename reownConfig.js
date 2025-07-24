import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = import.meta.env.VITE_PROJECT_ID;
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet],
  ssr: false,
});
export const appkitConfig = wagmiAdapter.wagmiConfig;