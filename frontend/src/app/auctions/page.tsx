import { AuctionCard } from "../../components/AuctionCard";
import { Layout } from "../../components/Layout";

import { AiOutlinePlus } from "react-icons/ai";

import { useRouter } from "next/navigation";
import Link from "next/link";
import path from "path";
import { hex2str } from "@/utils/utils";

const getAuctions = async () => {
    const DEFAULT_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/inspect";

    const DEFAULT_PAYLOAD = "auctions";

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
    // const auctions = [
    // 	{
    // 		id: "1",
    // 		name: "Default title for testing",
    // 		description: "Default description for testing",
    // 		startDate: "08/15/2023",
    // 		endDate: "08/15/2023",
    // 		address: "0x1234567890123456789012345678901234567890",
    // 		startPrice: 100.0,
    // 		price: 100.0,
    // 	},
    // 	{
    // 		id: "2",
    // 		name: "Default title for testing",
    // 		description: "Default description for testing",
    // 		startDate: "08/15/2023",
    // 		endDate: "08/15/2023",
    // 		address: "0x1234567890123456789012345678901234567890",
    // 		startPrice: 100.0,
    // 		price: 100.0,
    // 	},
    // 	{
    // 		id: "3",
    // 		name: "Default title for testing",
    // 		description: "Default description for testing",
    // 		startDate: "08/15/2023",
    // 		endDate: "08/15/2023",
    // 		address: "0x1234567890123456789012345678901234567890",
    // 		startPrice: 100.0,
    // 		price: 100.0,
    // 	},
    // 	{
    // 		id: "4",
    // 		name: "Default title for testing",
    // 		description: "Default description for testing",
    // 		startDate: "08/15/2023",
    // 		endDate: "08/15/2023",
    // 		address: "0x1234567890123456789012345678901234567890",
    // 		startPrice: 100.0,
    // 		price: 100.0,
    // 	},
    // 	{
    // 		id: "5",
    // 		name: "Default title for testing",
    // 		description: "Default description for testing",
    // 		startDate: "08/15/2023",
    // 		endDate: "08/15/2023",
    // 		address: "0x1234567890123456789012345678901234567890",
    // 		startPrice: 100.0,
    // 		price: 100.0,
    // 	},
    // ];

    const auctions = await getAuctions();
    console.log(auctions);

    return (
        <Layout title={"Auctions"}>
            <div className="w-auto flex flex-col content-start items-center mt-6 ml-6">
                <h1 className="w-auto text-3xl self-start font-bold">Live Auctions 🔥</h1>
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
                className="fixed flex justify-center items-center bg-blue-500 bottom-[50px] right-[50px] w-[50px] h-[50px] rounded-[50%]"
            >
                <AiOutlinePlus size={30} color="white" />
            </Link>
        </Layout>
    );
};

export default Auctions;
