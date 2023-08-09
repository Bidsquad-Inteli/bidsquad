/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import BidList from "./listBids";

export const AuctionModal = ({
  auction,
  modalOpen,
  closeModal,
}: {
  auction: {
    id: string;
    state: number;
    creator: string;
    carbonCredit: number;
    satteliteImageUrl: string;
    title: string;
    description: string;
    startDate: string;
    endDate: number;
  };
  modalOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <div
      className={`${
        modalOpen ? "z-50" : "hidden"
      } fixed inset-0 overflow-y-auto bg-black bg-opacity-50 min-h-screen min-w-screen h-auto flex justify-center items-center`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl w-11/12 md:w-3/5 h-4/5 flex flex-col items-center z-100">
        {/* Header (auction title and button to close modal) */}
        <div className="flex flex-row w-full justify-between items-center pb-4 my-4 px-4 border-b-[0.5px] border-gray-100">
          <h1 className="text-2xl font-bold">Auction</h1>

          <RiCloseFill
            size={24}
            onClick={closeModal}
            className="hover:cursor-pointer"
          />
        </div>

        {/* Body (auction image and description) */}
        <div className="flex flex-col w-full px-4 justify-between overflow-y-scroll pb-4">
          <div className="flex flex-col md:flex-row w-full md:px-12">
            <div className="flex flex-col h-full w-full md:w-2/3">
              <h1 className="font-bold text-4xl">{auction.title}</h1>
              <label className="font-bold text-md text-gray-400">
                {auction.description}
              </label>

              <div className="flex flex-col w-full mt-4">
                <div className="mb-2 flex flex-col">
                  <label className="font-bold text-sm text-gray-400">
                    Carbon credit
                  </label>
                  <label className="font-bold text-2xl">
                    {auction.carbonCredit} tons
                  </label>
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="font-bold text-sm text-gray-400">
                    Creator
                  </label>
                  <label className="font-bold text-2xl">
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
                  <label className="font-bold text-sm text-gray-400">
                    Start date
                  </label>
                  <label className="font-bold text-2xl">
                    {new Date(auction.startDate).toLocaleDateString()}
                  </label>
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="font-bold text-sm text-gray-400">
                    End date
                  </label>
                  <label className="font-bold text-2xl">
                    {new Date(auction.endDate).toLocaleDateString()}
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <img
                src={auction.satteliteImageUrl}
                alt="Auction item image"
                className="rounded-xl "
                width={500}
                height={250}
              />
            </div>
          </div>

          <div className="mt-12 w-full flex flex-col">
            <div className="pl-12 flex flex-col mb-4">
              <label className="self-start font-bold">Make a Bid 🤑</label>
              <label className="self-start font-bold text-gray-400 text-sm">
                Here you can make a bid on this auction
              </label>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-2/4 flex flex-row justify-between items-center px-8 h-[80px]">
                <input
                  type="number"
                  placeholder="Value of Bid"
                  className="w-[55%] h-[40px] border-[3px] border-primary outline-0 pl-4 rounded-md placeholder:text-black"
                ></input>
                <button className="w-[40%] h-[40px]  bg-primary outline-0 rounded-md">Bid 💵</button>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col">
            <BidList
              owner="0x71ce1e91bD8c4673e09EAb1F7a4D79B646d66874"
              amount={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
