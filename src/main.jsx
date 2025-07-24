import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { WagmiConfig } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import { appkitConfig, projectId, wagmiAdapter } from "./reownConfig";

const appKit = createAppKit({ projectId, networks: [mainnet], wagmiConfig: wagmiAdapter });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiAdapter.wagmiConfig}>
      <appKit.AppKitProvider>
        <App />
      </appKit.AppKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);