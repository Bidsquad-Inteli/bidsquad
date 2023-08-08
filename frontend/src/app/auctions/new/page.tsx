"use client";
//@ts-nocheck
import { Layout } from "@/components/Layout";
import { WaveTopBottomLoading } from "react-loadingg";

import { useState } from "react";

import { AuctionForm } from "@/components/Auction/form";
import { CoordinateForm } from "@/components/Coordinate/form";

enum Stages {
    COORDINATES = 0,
    AUCTION_FORM = 1,
}

const NewAuction = () => {
    const [stage, setStage] = useState(0);
    const [map, setMap] = useState("");

    let pageContent: React.ReactNode | null = null;
    switch (stage) {
        case Stages.COORDINATES:
            pageContent = <CoordinateForm map={map} setMap={setMap} setStage={setStage} stage={stage} />;
            break;
        case Stages.AUCTION_FORM:
            pageContent = <AuctionForm mapUrl={map} setStage={setStage} stage={stage} />;
            break;
    }

    return (
        <Layout title={"Auctions"}>
            <>
                <div className="w-auto flex flex-col content-start items-center mt-6 ml-6">
                    <h1 className="w-auto text-3xl self-start font-bold">Create an Auction</h1>
                    <label className="w-auto text-sm self-start font-bold text-gray-400">
                        You could create an auction for your property
                    </label>
                </div>
                {pageContent}
            </>
        </Layout>
    );
};

export default NewAuction;
