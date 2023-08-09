import { hex2str } from "./utils";
export interface BidsData {
  amount: number;
  auction_id: number;
  author: string;
  timestamp: number;
}

export const getBidsData = async (
  id: string | number
): Promise<BidsData[] | null> => {
  try {
    const bids = await fetch(
      `http://localhost:5005/inspect/auctions/${id}/bids`
    );
    const data = await bids.json();

    let bidsData = [];
    for (let i in data.reports) {
      let payload = data.reports[i].payload;
      bidsData = JSON.parse(`${hex2str(payload)}`);
    }

    return bidsData as BidsData[];
  } catch (err) {
    console.log("ERRO", err);
    return null;
  }
};

export const getLatestBidData = async (
  id: string | number
): Promise<BidsData | null> => {
  try {
    const bids = await fetch(
      `http://localhost:5005/inspect/auctions/${id}/bids`
    );
    const data = await bids.json();

    let bidsData = [];
    for (let i in data.reports) {
      let payload = data.reports[i].payload;
      bidsData = JSON.parse(`${hex2str(payload)}`);
    }

    return bidsData[bidsData.length - 1] as BidsData;
  } catch (err) {
    console.log("ERRO", err);
    return null;
  }
};
