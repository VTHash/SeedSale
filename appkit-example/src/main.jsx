import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import  "./index.css";
import { AppKitProvider, wagmiConfig } from "../reownConfig";
import { WagmiConfig } from "wagmi";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <AppKitProvider>
        <App />
      </AppKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);