/* eslint-disable @next/next/no-img-element */
'use client'
import { useMetamask } from "@/contexts/metamask";
import { BidsData, getBidsData } from "@/utils/getData";
import { sendInput } from "@/utils/send_data";
import { DiferenceTime, fromUnixTime, getTimeDiference } from "@/utils/utils";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiCloseFill } from "react-icons/ri";
import BidList from "./listBids";

interface BidsArgs {
    amount: number | BigNumber;
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
        start_date: number;
        end_date: number;
    };
    modalOpen: boolean;
    closeModal: () => void;
}

export const AuctionModal = ({ auction, modalOpen, closeModal }: AuctionModalProps) => {
    const [bidValue, setBidValue] = useState<Number>(0);
    const [bids, setBids] = useState<BidsData[]>([]);
    const [owner, setOwner] = useState<boolean>(false);
    const [auctionFinished, setAuctionFinished] = useState<boolean>(false);
    
    const { account } = useMetamask();

    const metaMask = useMetamask();

    let state = "";

    switch (auction.state) {
        case 0:
            state = "Created";
            break;
        case 1:
            state = "Open";
            break;
        case 2:
            state = "Closed";
            break;
    }

    // Função para realizar uma oferta no leilão
    const sendBid = async (id, amount) => {
        // console.log(account);
        if (amount <= 0) return toast.error("Bid must be greater than 0");
        if (account == null) return toast.error("Please connect your wallet");
        if (bids[0]) {
            if (amount >= bids[0].amount) return toast.error("Bid must be less than the winning bid");
        }
        if (account == auction.creator) return toast.error("You can't bid on your own auction");

        try {
            const payload: Bids = {
                method: "bid",
                args: {
                    amount,
                    auction_id: id,
                },
            };

            console.log(payload);

            await sendInput(payload);
            toast.success("Bid sent successfully");
            const data = await getBidsData(auction.id);
            if (data) setBids(data);
        } catch (err) {
            toast.error("Error sending bid");
        }
    };

    useEffect(() => {
        const timeDiference: DiferenceTime | null = getTimeDiference(auction.start_date, auction.end_date);

        if (timeDiference) {
            setAuctionFinished(false);
        } else {
            setAuctionFinished(true);
        }

        if (auction.creator == metaMask.account) {
            setOwner(true);
        } else {
          setOwner(false)
        }

        getBidsData(auction.id).then((data) => {
            if (data) {
                for (let bid of data) {
                    if (typeof bid.amount == "number") {
                        bid.amount = bid.amount / 10 ** 18;
                    } else {
                        bid.amount = Number(ethers.utils.formatEther(bid.amount));
                    }
                }
                data.sort((a, b) => a.amount - b.amount);
                setBids(data);
            }
        });
    }, [modalOpen]);

    return (
        <div
            className={`${
                modalOpen ? "z-50" : "hidden"
            } fixed inset-0 bg-black bg-opacity-50 min-w-screen flex justify-center items-center overflow-hidden`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl w-11/12 md:w-3/5 flex flex-col items-center z-100 overflow-y-auto max-h-[700px]">
                <div className="flex flex-row w-full justify-between items-center mb-4 px-4 py-4 border-b-[0.5px] border-gray-300">
                    <h1 className="text-2xl font-bold px-4">Auction Details</h1>
                    <div className="w-auto flex flex-row items-center justify-center">
                        {owner && auctionFinished && (
                            <button
                                className="bg-black grow hover:bg-primary transition text-white font-bold py-2 px-4 mr-10 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const payload = {
                                        method: "end",
                                        args: {
                                            auction_id: auction.id,
                                            withdraw: true,
                                        },
                                    };
                                    sendInput(payload);
                                }}
                            >
                                End auction
                            </button>
                        )}
                        <RiCloseFill size={24} onClick={closeModal} className="hover:cursor-pointer" />
                    </div>
                </div>
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

                                <div className="mb-2 flex flex-col">
                                    <label className="font-medium text-sm text-gray-400">Status</label>
                                    <label className="font-medium text-2xl">{state}</label>
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

                    {owner || auctionFinished ? (
                        <div className="w-full flex items-center justify-center">
                            <span className="self-start font-medium">
                                {owner ? "- You are the owner of this -" : "- Time is over to make a bid -"}
                            </span>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col mb-2">
                            <div className="pl-12 flex flex-col mb-4">
                                <label className="self-start font-bold">Make a Bid 🤑</label>
                                <label className="self-start font text-gray-400 text-sm">
                                    Here you can make a bid on this auction
                                </label>
                            </div>
                            <div className="w-full flex gap-2 md:px-12">
                                <input
                                    type="number"
                                    placeholder="Value of Bid in ethers"
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
                    )}

                    {bids && (
                        <div className="mt-4 w-full flex flex-col">
                            <div className="pl-12 flex flex-col mb-4">
                                <label className="self-start font-bold">Bids 🔥</label>
                                <label className="self-start text-gray-400">
                                    Here you can see a list of all bids on this auction
                                </label>
                            </div>
                            {bids && bids.length > 0 ? bids.map((bid: BidsData, key: number) => (
                                <BidList key={key} unique={key} owner={bid.author} amount={bid.amount} />
                            )) : (
                              <p className="py-4 text-center">---No bids yet---</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
