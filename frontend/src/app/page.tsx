"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Layout } from "../components/Layout";
import MetamaskLogo from "@/assets/metamask.png";
import { useMetamask } from "@/contexts/metamask";

const Home = () => {
  const { setAccount } = useMetamask();
  const router = useRouter();

  const connectToMetamask = async () => {
    const ethereum = (window as any).ethereum;

    if (!ethereum) {
      alert("Install MetaMask");
      return;
    }

    try {
      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);

      const desiredChainId = "0x7a69";
      console.log("REDE!!!!!!", ethereum.chainId);
      if (ethereum.chainId !== desiredChainId) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: desiredChainId }],
        });
      }

      router.replace("/auctions");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout title="Home">
      <div className="flex flex-col items-center justify-center h-full py-12 px-4">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-primary">BidSquad</span>
        </h1>
        <button
          onClick={connectToMetamask}
          className="mt-[35vh] flex items-center text-xl hover:scale-105 transition-all gap-4 bg-primary py-2 px-4 rounded"
        >
          <Image alt="Metamask logo" src={MetamaskLogo} height={40} />
          Connect to metamask
        </button>
      </div>
    </Layout>
  );
};

export default Home;
