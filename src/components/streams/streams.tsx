import { FC, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Stream } from "@streamflow/stream";
import { DashboardContext } from "../dashboardProvider/dashboardProvider";

const Streams: FC = () => {
  const client = useContext(DashboardContext);
  const { publicKey } = useWallet();
  const [streams, setStreams] = useState<[string, Stream][]>([]);

  useEffect(() => {
    const getStreams = async () => {
      try {
        if (!publicKey) return;
        const res = await client.get({ address: publicKey.toBase58() });
        setStreams(res);
      } catch (error: any) {
        console.error("error", error);
      }
    };

    getStreams();
  }, []);

  return (
    <div className="ml-3 ">
      <h3 className="mb-5 text-2xl">Stream List</h3>
      {streams.length ? (
        <ul>
          {streams.map(([name]) => (
            <li>{name}</li>
          ))}
        </ul>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default Streams;
