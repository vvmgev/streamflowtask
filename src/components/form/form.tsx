import { FC, useContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { BN } from "bn.js";
import { ICreateStreamData, getBN } from "@streamflow/stream";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { DashboardContext } from "../dashboardProvider/dashboardProvider";

const Form: FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const client = useContext(DashboardContext);
  const { wallet } = useWallet();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createStreamParams: ICreateStreamData = {
      recipient: recipient || "BpzXsJRhm9xhGDrEwPcJBAMPYut5Tp5tUUHMBUcnwrGb",
      tokenId: tokenId || "6NxksM8KVVfMPjoCaQuWtuoKsLn7J9LpqbzH3iu84A69",
      start: 1713030334561,
      amount: getBN(1, 9),
      period: 1,
      cliff: 1643363160,
      cliffAmount: new BN(1),
      amountPerPeriod: getBN(1, 9),
      name: "Example",
      canTopup: false,
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
    };

    const solanaParams = {
      sender: wallet?.adapter as SignerWalletAdapter,
      isNative: true,
    };

    try {
      const res = await client.create(createStreamParams, solanaParams);
      console.log(res);
    } catch (error: any) {
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <div className="pb-5 mb-5 border-b border-white">
      <h1 className="text-4xl text-center">Welcome Dashaboard</h1>
      <div className="text-red-500">{error}</div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 ml-3">
        <div>Recipient</div>
        <input
          type="text"
          className="w-2/5 h-10 p-1 pl-3 mt-2 rounded"
          placeholder="Recipient address (BpzXsJRhm9xhGDrEwPcJBAMPYut5Tp5tUUHMBUcnwrGb)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <div>Token ID</div>
        <input
          type="text"
          className="w-2/5 h-10 p-1 pl-3 mt-2 rounded"
          placeholder="Token ID (DNw99999M7e24g99999999WJirKeZ5fQc6KY999999gK)"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />

        <div>Amount</div>
        <input
          type="number"
          className="w-2/5 h-10 p-1 pl-3 mt-2 rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div>Start Date</div>
        <input type="date" className="w-2/5 h-10 p-1 pl-3 mt-2 rounded" placeholder="Start Date" />

        <div>Start Time</div>
        <input type="time" className="w-2/5 h-10 p-1 pl-3 mt-2 rounded" placeholder="Start Time" />

        <button className="w-40 " type="submit">
          Create
        </button>
      </form>
      <div className="absolute flex gap-2 right-2 top-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default Form;
