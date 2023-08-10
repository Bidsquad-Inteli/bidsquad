/* eslint-disable @next/next/no-img-element */
"use client";

import React, { use, useEffect } from "react";

import { BidsData, getLatestBidData } from "@/utils/getData";
import Image from "next/image";
import Jazzicon from "react-jazzicon";
import { FaEthereum } from "react-icons/fa";
import { useMetamask } from "@/contexts/metamask";
import { DiferenceTime, getTimeDiference } from "@/utils/utils";
import { ethers } from "ethers";

export const AuctionCard = ({
  id,
  title,
  satteliteImageUrl,
  description,
  carbonCredit,
  start_date,
  end_date,
  state,
  creator,
}: {
  id: string;
  state: number;
  creator: string;
  carbonCredit: number;
  satteliteImageUrl: string;
  title: string;
  description: string;
  start_date: number;
  end_date: number;
}) => {
  const [timeToFinnish, setTimeToFinnish] =
    React.useState<DiferenceTime | null>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [latestBid, setLatestBid] = React.useState<BidsData>();
  const [owner, setOwner] = React.useState<boolean>(false);

  const metaMask = useMetamask();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // useEffect(() => {
  //   if (!end_date) return;
  //   console.log("startDate", start_date)
  //   console.log("endDate", end_date)
  //   // const finalDate = new Date(endDate * 1000);
  //   const finalDate = new Date(end_date);
  //   const now = new Date();
  //   const diff = finalDate.getTime() - now.getTime();
  //   const diffDays = diff / (1000 * 3600 * 24);
  //   const diffDaysRounded = Math.round(diffDays);

  //   setTimeToFinnish(diffDaysRounded);
  // }, [end_date]);

  //States
  // 0 = Created
  // 1 = Started
  // 2 = Finished

  useEffect(() => {
    const timeDiference: DiferenceTime | null = getTimeDiference(
      start_date,
      end_date
    );
    if (timeDiference) {
      setTimeToFinnish(timeDiference);
    } else {
      setTimeToFinnish(null);
    }
    if (creator == metaMask.account) setOwner(true);
    getLatestBidData(id).then((bid) => {
      if (bid) {
        if (typeof bid.amount === "number") bid.amount = bid.amount / 10 ** 18;
        else bid.amount = Number(ethers.utils.formatEther(bid.amount));
        setLatestBid(bid);
      }
    });
  }, []);

  return (
    <>
      <div
        onClick={toggleModal}
        className={`flex flex-col w-[400px] ${
          owner
            ? "border-primary border-[3px]"
            : "border-grey-100 border-[0.25px]"
        } pl-4 pr-4 pt-2 pb-4 rounded-xl overflow-hidden hover:scale-105 transition duration-150 bg-white ease-in-out https://open.spotify.com/track/5ffntNJnJOeFv7b7DCd0Bwhover:cursor-grabbing	`}
      >
        {owner && <span className="select-none font-bold">OWNER</span>}
        <div className="flex flex-col w-full">
          <div className="w-full flex items-center justify-center relative h-auto">
            {/* <img
                            src={satteliteImageUrl}
                            alt="Auction item image"
                            className="object-cover w-full h-full"
                        /> */}
            <Image
              src={satteliteImageUrl}
              alt="Auction item image"
              className="rounded-xl"
              width={400}
              height={400}
            />
            <div className="absolute bg-white rounded-xl flex items-center justify-center bottom-[10px] left-[10px] w-auto px-4 h-[40px] select-none">
              <label>
                {timeToFinnish
                  ? `🔥 Ends in: ${timeToFinnish.value} ${timeToFinnish.time}`
                  : `The time to bid is over`}
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start ml-2 mt-2">
            <h1 className="font-bold text-2xl">{title}</h1>
            <label className="font-bold text-sm text-gray-400">
              {description}
            </label>
          </div>

          <div className="w-full flex flex-row justify-start items-center gap-2 text-ellipsis ml-2 mt-4">
            <Jazzicon
              diameter={35}
              seed={Math.round(Math.random() * 10000000)}
            />
            <label className="text-ellipsis w-[80%]">
              {creator.substring(0, 6)}...
              {creator.substring(creator.length - 4, creator.length)}
            </label>
          </div>

          <hr className="w-full border-[0.25px] border-gray-100 mt-4"></hr>

          <div className="w-full flex flex-row justify-between items-center ml-2 mt-8">
            <div className="flex flex-col items-start justify-center">
              <label className="text-sm text-grey-200 font-bold">
                Carbon credits: {carbonCredit}
              </label>
              <label className="text-2xl flex gap-1 items-center font-bold">
                {latestBid ? latestBid.amount : "--"}{" "}
                <FaEthereum />
              </label>
              <label className="text-sm font-bold text-gray-400">
                Latest Bid
              </label>
            </div>
            <div className="flex items-start justify-center mr-4">
              <button className="bg-black hover:bg-primary transition text-white font-bold py-2 px-4 rounded">
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
