import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, PropsWithChildren, createContext } from "react";
import { StreamflowSolana } from "@streamflow/stream";
import { SolanaStreamClient } from "@streamflow/stream/solana";

type Props = PropsWithChildren<{}>;

export const DashboardContext = createContext<SolanaStreamClient>({} as SolanaStreamClient);

const DashaboardProvider: FC<Props> = ({ children }) => {
  const { connection } = useConnection();
  const solanaClient = new StreamflowSolana.SolanaStreamClient(connection.rpcEndpoint);
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="flex flex-col items-center gap-5">
        <h1>Select Crypto Wallet</h1>
        <WalletMultiButton />
      </div>
    );
  }

  return <DashboardContext.Provider value={solanaClient}>{children}</DashboardContext.Provider>;
};

export default DashaboardProvider;
