/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import BidList from "./listBids";
import { DAPP_ADDRESS, sendInput } from "@/utils/send_data";
import { useEffect, useState } from "react";
import { BidsData, getBidsData } from "@/utils/getData";
import dayjs from "dayjs";
import { fromUnixTime } from "@/utils/utils";
import { toast } from "react-hot-toast";
import { useMetamask } from "@/contexts/metamask";

interface BidsArgs {
    amount: number;
    auction_id: number;
}
interface Bids {
    method: string;
    args: BidsArgs;
}

interface AuctionModalProps {
    auction: {
        id: string;
        state: number;
        creator: string;
        carbonCredit: number;
        satteliteImageUrl: string;
        title: string;
        description: string;
        start_date: string;
        end_date: number;
    };
    modalOpen: boolean;
    closeModal: () => void;
}

export const AuctionModal = ({ auction, modalOpen, closeModal }: AuctionModalProps) => {
    const [bidValue, setBidValue] = useState<Number>(0);
    const [bids, setBids] = useState<BidsData[]>([]);
    const { account } = useMetamask();

    // Função para realizar uma oferta no leilão
    const sendBid = async (id, amount) => {
        console.log(account);
        if (amount <= 0) return toast.error("Bid must be greater than 0");
        if (account == null) return toast.error("Please connect your wallet");
        if (account == auction.creator) return toast.error("You can't bid on your own auction");

        try {
            const payload: Bids = {
                method: "bid",
                args: {
                    amount: amount,
                    auction_id: id,
                },
            };

            await sendInput(payload);
            toast.success("Bid sent successfully");
            const data = await getBidsData(auction.id);
            if (data) setBids(data);
        } catch (err) {
            toast.error("Error sending bid");
        }
    };

    useEffect(() => {
        getBidsData(auction.id).then((data) => {
            if (data) setBids(data);
        });
    }, [modalOpen]);

    return (
        <div
            className={`${
                modalOpen ? "z-50" : "hidden"
            } fixed inset-0 bg-black bg-opacity-50 min-h-screen min-w-screen flex justify-center items-center`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl w-11/12 md:w-3/5 flex flex-col items-center z-100">
                <div className="flex flex-row w-full justify-between items-center mb-4 px-4 py-4 border-b-[0.5px] border-gray-300">
                    <h1 className="text-2xl font-bold px-4">Auction Details</h1>

                    <RiCloseFill size={24} onClick={closeModal} className="hover:cursor-pointer" />
                </div>

                {/* Body (auction image and description) */}
                <div className="flex flex-col w-full px-4 justify-between pb-4 py-4">
                    <div className="flex flex-col md:flex-row w-full md:px-12 items-center">
                        <div className="flex flex-col h-full w-full md:w-2/3">
                            <h1 className="font-medium text-4xl">{auction.title}</h1>
                            <label className="text-md mt-2 text-gray-400">{auction.description}</label>

                            <div className="flex flex-col w-full mt-4">
                                <div className="mb-2 flex flex-col">
                                    <label className="font-medium text-sm text-gray-400">Carbon credit</label>
                                    <label className="font-medium text-2xl">{auction.carbonCredit} tons</label>
                                </div>

                                <div className="mb-2 flex flex-col">
                                    <label className="font-medium text-sm text-gray-400">Creator</label>
                                    <label className="font-medium text-2xl">
                                        {auction.creator &&
                                            auction.creator.substring(0, 6) +
                                                "..." +
                                                auction.creator.substring(
                                                    auction.creator.length - 4,
                                                    auction.creator.length
                                                )}
                                    </label>
                                </div>

                                <div className="mb-2 flex flex-col">
                                    <label className="font-medium text-sm text-gray-400">Start date</label>
                                    <label className="font-medium text-2xl">{fromUnixTime(auction.start_date)}</label>
                                </div>

                                <div className="mb-2 flex flex-col">
                                    <label className="font-medium text-sm text-gray-400">End date</label>
                                    <label className="font-medium text-2xl">{fromUnixTime(auction.end_date)}</label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <img
                                src={auction.satteliteImageUrl}
                                alt="Auction item image"
                                className="rounded-xl object-cover mx-auto"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>

                    <div className="h-[2px] my-8 rounded bg-gray-500 md:mx-12"></div>

                    <div className="w-full flex flex-col">
                        <div className="pl-12 flex flex-col mb-4">
                            <label className="self-start font-medium">Make a Bid 🤑</label>
                            <label className="self-start font-medium text-gray-400 text-sm">
                                Here you can make a bid on this auction
                            </label>
                        </div>
                        <div className="w-full flex gap-2 md:px-12">
                            <input
                                type="number"
                                placeholder="Value of Bid"
                                className="grow h-[40px] border-[3px] border-primary outline-0 pl-4 rounded-md placeholder:text-black"
                                onChange={(e) => {
                                    setBidValue(Number(e.target.value));
                                }}
                            ></input>
                            <button
                                className="px-4 text-black font-bold bg-primary outline-0 rounded-md"
                                onClick={(e) => {
                                    e.preventDefault();
                                    sendBid(Number(auction.id), bidValue);
                                }}
                            >
                                Bid
                            </button>
                        </div>
                    </div>

                    {bids && (
                        <>
                            <div className="pl-12 flex flex-col mt-8 mb-4">
                                <label className="self-start font-bold">Bids 🔥</label>
                                <label className="self-start font-bold text-gray-400">
                                    Here you can see a list of all bids on this auction
                                </label>
                            </div>

                            <div className="my-4 w-full flex flex-col gap-2 justify-center items-center">
                                {bids.map((bid: BidsData, key) => (
                                    <BidList key={key} owner={bid.author} amount={bid.amount} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
