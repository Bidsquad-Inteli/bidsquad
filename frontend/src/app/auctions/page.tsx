"use client";
import { AuctionCard } from "../../components/auction/card";
import { Layout } from "../../components/Layout";

import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";

import { hex2str } from "@/utils/utils";
import Link from "next/link";
import path from "path";
import { useEffect, useState } from "react";

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

const AuctionPage = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAuctions = async () => {
        try {
            const response = await fetch("http://localhost:5005/inspect/auctions");

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
            console.log(auctions)
            setAuctions(auctions);
        } catch (err) {
            // setAuctions([
            //     {
            //         id: "1",
            //         state: 1,
            //         creator: "0x000000",
            //         carbonCredit: 100,
            //         satteliteImageUrl: "https://imgur.com/R1DlCa4.png",
            //         title: "Auction 1",
            //         description: "Auction 1",
            //         startDate: "2021-10-10",
            //         endDate: "2021-10-10",
            //     },
            // ]);
        }
    };

    useEffect(() => {
        getAuctions();
    }, [])

    return (
        <Layout title={"Auctions"}>
            <div className="flex justify-between items-center mx-6">
                <div className="w-auto flex flex-col content-start items-center mt-6 ">
                    <h1 className="w-auto text-3xl self-start font-bold">Live Auctions 🔥</h1>
                    <label className="w-auto text-sm self-start font-bold text-gray-400">
                        Enjoy! The latest hot auctions
                    </label>
                </div>

                <div>
                    <AiOutlineReload size={40} onClick={getAuctions} className="hover:cursor-pointer hover:scale-105 transition-all" />
                </div>
            </div>

            <div className="w-full mt-12 flex flex-wrap justify-center items-center gap-4">
                {auctions.length > 0 ? (
                    auctions.map((auction, index) => <AuctionCard key={index} {...auction} />)
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
