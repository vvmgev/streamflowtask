import { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import DashaboardProvider from "./components/dashboardProvider/dashboardProvider";
import Form from "./components/form/form";
import Streams from "./components/streams/streams";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

const App: FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <DashaboardProvider>
            <Form />
            <Streams />
          </DashaboardProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
export default App;
