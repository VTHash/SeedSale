import { createAppKit } from '@reown/appkit';
import { mainnet } from '@wagmi/chains';

const projectId = import.meta.env.VITE_PROJECT_ID;

const appKit = createAppKit({
  projectId,
  chains: [mainnet],
});

export const wagmiConfig = appKit.wagmiConfig;
export const AppKitProvider = appKit.AppKitProvider;
