import { AuctionCard } from "../../components/AuctionCard";
import { Layout } from "../../components/Layout";

import { AiOutlinePlus } from "react-icons/ai";

import { hex2str } from "@/utils/utils";
import Link from "next/link";
import path from "path";

const getAuctions = async () => {
  const DEFAULT_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/inspect";

  const DEFAULT_PAYLOAD = "auctions";

  try {
    const response = await fetch(path.join(DEFAULT_URL, DEFAULT_PAYLOAD));

    if (response.status != 200) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const res = await response.json();

    console.log(`Inspect status: ${JSON.stringify(res.status)}`);
    console.log(`Input count: ${JSON.stringify(res.processed_input_count)}`);
    console.log(`Reports:`);

    let auctions;
    console.log(res.reports);
    for (let i in res.reports) {
      let payload = res.reports[i].payload;
      auctions = JSON.parse(`${hex2str(payload)}`);
    }
    if (res.exception_payload) {
      let payload = res.exception_payload;
      console.log(`Exception payload: ${hex2str(payload)}`);
    }

    return auctions;
  } catch (err) {
    return [
      {
        id: "1",
        state: 1,
        creator: "0x000000",
        carbonCredit: 100,
        satteliteImageUrl:
          "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=color:0xff0000ff|weight:5|40.737102,-73.990318|40.749825,-73.987963|40.752946,-73.987384|40.755823,-73.986397|40.747922,-73.975556|40.737102,-73.990318&key=AIzaSyAj33Dfa7ZT-9hrs5lgFMIRSsBGfRmNZxo",
        title: "Auction 1",
        description: "Auction 1",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
      },
    ];
  }
};

interface Auction {
  id: string;
  state: number;
  creator: string;
  carbonCredit: number;
  satteliteImageUrl: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Auctions: React.FC = async () => {
  const auctions: Auction[] = await getAuctions();

  return (
    <Layout title={"Auctions"}>
      <div className="w-auto flex flex-col content-start items-center mt-6 ml-6">
        <h1 className="w-auto text-3xl self-start font-bold">
          Live Auctions 🔥
        </h1>
        <label className="w-auto text-sm self-start font-bold text-gray-400">
          Enjoy! The latest hot auctions
        </label>
      </div>

      <div className="w-full mt-12 flex flex-wrap justify-center items-center gap-4">
        {auctions.map((auction, index) => (
          <AuctionCard key={index} {...auction} />
        ))}
      </div>

      <Link
        href={"/auctions/new"}
        className="fixed flex justify-center items-center bg-primary bottom-[50px] right-[50px] w-[50px] h-[50px] rounded-[50%]"
      >
        <AiOutlinePlus size={30} color="white" />
      </Link>
    </Layout>
  );
};

export default Auctions;
