"use client";
import { AuctionCard } from "../../components/Auction/card";
import { Layout } from "../../components/Layout";

import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";

import { hex2str } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Auction {
  id: string;
  state: number;
  creator: string;
  carbonCredit: number;
  satteliteImageUrl: string;
  title: string;
  description: string;
  startDate: string;
  endDate: number;
}

const AuctionPage = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

//   const router = useRouter();

  const getAuctions = async () => {
    try {
      const response = await fetch("http://localhost:5005/inspect/auctions");

      if (response.status != 200) {
        // router.push("/");
        return;
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
      console.log(auctions);
      setAuctions(auctions);
    } catch (err) {
      setAuctions([
          {
              id: "1",
              state: 1,
              creator: "0x71ce1e91bD8c4673e09EAb1F7a4D79B646d66874",
              carbonCredit: 100,
              satteliteImageUrl: "https://imgur.com/R1DlCa4.png",
              title: "Auction Teste",
              description: "Auction Teste Description",
              startDate: "12/04/2004",
              endDate: "12/04/2004",
          },
      ]);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  return (
    <Layout title={"Auctions"}>
      <div className="flex justify-between items-center mx-6">
        <div className="w-auto flex flex-col content-start items-center mt-6 ">
          <h1 className="w-auto text-3xl self-start font-bold">
            Live Auctions 🔥
          </h1>
          <label className="w-auto text-sm self-start font-bold text-gray-400">
            Enjoy! The latest hot auctions
          </label>
        </div>

        <div>
          <AiOutlineReload
            size={40}
            onClick={getAuctions}
            className="hover:cursor-pointer hover:scale-105 transition-all"
          />
        </div>
      </div>

      <div className="w-full mt-12 flex flex-wrap justify-center items-center gap-4">
        {auctions.length > 0 ? (
          auctions.map((auction, index) => (
            <AuctionCard key={index} {...auction} />
          ))
        ) : (
          <p className="mt-16 text-lg">---No auctions available---</p>
        )}
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

export default AuctionPage;
