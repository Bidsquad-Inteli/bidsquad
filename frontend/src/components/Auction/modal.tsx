/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";

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
        endDate: string;
    };
    modalOpen: boolean;
    closeModal: () => void;
}) => {
    return (
        <div
            className={`${
                modalOpen ? "z-50" : "hidden"
            } absolute inset-0 overflow-y-auto bg-black bg-opacity-50 min-h-screen min-w-screen h-auto flex justify-center items-center`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl w-11/12 md:w-3/5 h-4/5 flex flex-col items-center z-100">
                {/* Header (auction title and button to close modal) */}
                <div className="flex flex-row w-full justify-between items-center pb-4 my-4 px-4 border-b-[0.5px] border-gray-100">
                    <h1 className="text-2xl font-bold">
                        Auction
                    </h1>

                    <RiCloseFill
                        size={24}
                        onClick={closeModal}
                        className="hover:cursor-pointer"
                    />
                </div>

                {/* Body (auction image and description) */}
                <div className="flex flex-col md:flex-row w-full px-4 justify-between overflow-y-auto pb-4">
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
                                    {auction.creator}
                                </label>
                            </div>

                            <div className="mb-2 flex flex-col">
                                <label className="font-bold text-sm text-gray-400">
                                    Start date
                                </label>
                                <label className="font-bold text-2xl">
                                    {Date.parse(
                                        auction.startDate
                                    ).toLocaleString()}
                                </label>
                            </div>

                            <div className="mb-2 flex flex-col">
                                <label className="font-bold text-sm text-gray-400">
                                    End date
                                </label>
                                <label className="font-bold text-2xl">
                                    {auction.endDate}
                                </label>
                            </div>

                            <div className="mb-2 flex flex-col">
                                <label className="font-bold text-sm text-gray-400">
                                    State
                                </label>
                                <label className="font-bold text-2xl">
                                    {auction.state}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <img
                            src={auction.satteliteImageUrl}
                            alt="Auction item image"
                            className="rounded-xl "
                            width={400}
                            height={250}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
