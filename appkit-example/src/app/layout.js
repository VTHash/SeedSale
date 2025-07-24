'use client';

import './globals.css';
import { WagmiProvider } from 'wagmi';
import { AppKitProvider, wagmiConfig } from '../../reownConfig';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <AppKitProvider>
            {children}
          </AppKitProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}