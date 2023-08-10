"use client";
import { AuctionCard } from "../../components/Auction/card";
import { Layout } from "../../components/Layout";

import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";

import { hex2str } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuctionModal } from "@/components/Auction/modal";
import { Auction, getAuctions, getBidsData } from "@/utils/getData";

const AuctionPage = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Object>({});

  //   const router = useRouter();

  useEffect(() => {
    getAuctions().then((auctions) => {
      console.log("auctions", auctions);
      if (auctions) {
        auctions = auctions.filter(function(item) {
          return item.state != 2; 
        });

        setAuctions(auctions);
      } 
    })
  }, []);

  function openModal(auction) {
    setModalContent(auction);
    toggleModal();
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Layout title={"Auctions"}>
      <AuctionModal
        modalOpen={isModalOpen}
        auction={modalContent as any}
        closeModal={toggleModal}
      />
      <div className={`${isModalOpen ? "overflow-hidden h-[100%]" : ""} mb-12`}>
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

        <div
          className={`w-full mt-12 flex flex-wrap justify-center items-center gap-4`}
        >
          {auctions.length > 0 ? (
            auctions.map((auction, index) => (
              <div
                onClick={() => {
                  openModal(auction);
                }}
                key={index}
              >
                <AuctionCard {...auction} />
              </div>
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
      </div>
    </Layout>
  );
};

export default AuctionPage;
